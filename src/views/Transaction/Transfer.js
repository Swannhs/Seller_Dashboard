import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AllUser from "./AllUser";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import {Input} from "reactstrap";
import VoucherGroup from "../Voucher/CreateVoucher/VoucherGroup";
import VoucherProfile from "../Voucher/CreateVoucher/VoucherProfile";

class Transfer extends Component {
    state = {
        id: 0,
        partner_user_id: '',
        realm_id: '',
        profile_id: '',
        transfer_amount: '',
        quantity_rate: '',
        role: '',
        error: {
            partner: '',
            balance: ''
        }
    }


    componentDidMount() {
        const cookie = new Cookies;
        this.setState({
            role: cookie.get('Role')
        })
    }


    onTransactionComplete = () => {
        const cookie = new Cookies()
        let data = this.state
        RadiusApi.post('/voucher-transactions/add.json', data, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                if (this.state.role === 'admin') {
                    if (response.data.success) {
                        alert('Transfer amount successfully')
                        this.props.history.push('/admin/root/voucher/transaction')
                    } else {
                        alert(response.data.message)
                        this.setState({
                            error: {
                                partner: response.data.partner ? response.data.partner : null,
                                balance: response.data.message ? response.data.message : null
                            }
                        })
                    }
                } else {
                    if (response.data.success) {
                        alert('Transfer amount successfully')
                        this.props.history.push('/admin/voucher/transaction')
                    } else {
                        alert(response.data.message)
                        this.setState({
                            error: {
                                balance: response.data.message
                            }
                        })
                    }
                }
            })
    }

    onCreatePartner = async data => {
        this.setState({
            partner_user_id: data
        })
    }

    onCreateGroup = async data => {
        this.setState({
            realm_id: data,
            id: data
        })
    }

    onCreateProfile = async data => {
        this.setState({
            profile_id: data
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='ml-3'>
                    {
                        this.state.root === 'admin' ?
                            <Link to='/admin/root/voucher/transaction'>
                                <button className='ui button'>Back</button>
                            </Link> : <Link to='/admin/voucher/transaction'>
                                <button className='ui button'>Back</button>
                            </Link>
                    }

                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <AllUser onChange={this.onCreatePartner}/>
                    <p className='text-danger'>{this.state.error.partner}</p>
                    <VoucherGroup onChange={this.onCreateGroup}/>
                    <VoucherProfile onChange={this.onCreateProfile}/>

                    <div className='pl-3'>
                        <h3 className='text-black-50'>Amount</h3>
                        <Input type='number'
                               placeholder='The amount you want to transfer'
                               value={this.state.transfer_amount}
                               onChange={event => {
                                   this.setState({
                                       transfer_amount: event.target.value
                                   })
                               }}
                               required={true}
                        />
                        <p className='text-danger'>{this.state.error.balance}</p>
                        <h3 className='text-black-50'>Amount Per Quantity rate</h3>
                        <Input type='number'
                               placeholder='Quantity rate'
                               value={this.state.quantity_rate}
                               onChange={event => {
                                   this.setState({
                                       quantity_rate: event.target.value
                                   })
                               }}
                               required={true}
                        />


                        <button className='ui button primary' onClick={this.onTransactionComplete}>
                            Transfer
                        </button>
                    </div>

                </article>

            </div>
        );
    }
}

export default Transfer;
