import React, {Component} from 'react';
import {Input} from "reactstrap";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import VoucherGroup from "../Voucher/CreateVoucher/VoucherGroup";
import VoucherProfile from "../Voucher/CreateVoucher/VoucherProfile";

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
            <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                <VoucherGroup onChange={this.onCreateGroup}/>
                <VoucherProfile onChange={this.onCreateProfile}/>
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
                <h3 className='text-black-50'>Quantity per rate</h3>
                <Input type='number'
                       placeholder='The amount you want to transfer'
                       value={this.state.quantity_rate}
                       onChange={event => {
                           this.setState({
                               quantity_rate: event.target.value
                           })
                       }}
                       required={true}
                />
                <button className='ui button positive' onClick={this.onGenerate}>
                    Generate
                </button>
            </article>
        );
    }
}

export default GenerateBalance;