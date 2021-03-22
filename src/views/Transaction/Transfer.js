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
        partner_user_id: '',
        realm_id: '',
        profile_id: '',
        transfer_amount: '',
        root: false

    }


    componentDidMount() {
        const cookie = new Cookies
        RadiusApi.get('/dashboard/checkToken/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    root: response.data.data.isRootUser
                })
            })
    }


    onTransactionComplete = () => {
        const cookie = new Cookies()
        let data = this.state
        RadiusApi.post('/voucher-transactions/add.json', data, {
            params: {
                token : cookie.get('Token')
            }
        })
            .then(response => {
                if (this.state.root){
                    alert('Transfer amount successfully')
                    this.props.history.push('/admin/root/voucher/transaction')
                }
                else {
                    alert('Transfer amount successfully')
                    this.props.history.push('/admin/voucher/transaction')
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
            realm_id: data
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
                    {this.state.root?
                        <Link to='/admin/root/voucher/transaction'>
                            <button className='ui button'>Back</button>
                        </Link>:<Link to='/admin/voucher/transaction'>
                            <button className='ui button'>Back</button>
                        </Link>
                    }

                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <AllUser onChange={this.onCreatePartner}/>
                    <VoucherGroup onChange={this.onCreateGroup}/>
                    <VoucherProfile onChange={this.onCreateProfile}/>

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

                    <button className='ui button primary' onClick={this.onTransactionComplete}>
                        Transfer
                    </button>
                </article>

            </div>
        );
    }
}

export default Transfer;
