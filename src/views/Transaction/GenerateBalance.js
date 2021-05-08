import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import VoucherGroup from "../Voucher/CreateVoucher/VoucherGroup";
import VoucherProfile from "../Voucher/CreateVoucher/VoucherProfile";
import {Link} from "react-router-dom";

class GenerateBalance extends Component {
    state = {
        transfer_amount: '',
        realm_id: '',
        profile_id: '',
        quantity_rate: '',
        partner_user_id: 44
    }


    onGenerate = () => {
        const cookie = new Cookies()
        let data = this.state
        RadiusApi.post('/voucher-transactions/generate.json', data, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                alert('Amount generate successfully')
                this.props.history.push('/admin/root/voucher/transaction')

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
                    <Link to='/admin/root/voucher/transaction'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>
                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <VoucherGroup onChange={this.onCreateGroup}/>
                    <VoucherProfile onChange={this.onCreateProfile}/>

                    <h3 className='mt-3 text-black-50'>Amount</h3>

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-table"/> </span>
                        </div>
                        <input className="form-control" placeholder="Amount" type="text"
                               value={this.state.transfer_amount}
                               onChange={event => this.setState({transfer_amount: event.target.value})}
                               required={true}
                        />
                    </div>

                    <h3 className='mt-3 text-black-50'>Quantity Rate</h3>

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-table"/> </span>
                        </div>
                        <input className="form-control" placeholder="Rate" type="text"
                               value={this.state.quantity_rate}
                               onChange={event => this.setState({quantity_rate: event.target.value})}
                               required={true}
                        />
                    </div>

                    <button className='ui button positive mt-2' onClick={this.onGenerate}>
                        Generate
                    </button>
                </article>
            </div>
        );
    }
}

export default GenerateBalance;
