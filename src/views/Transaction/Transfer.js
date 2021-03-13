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
        user_id: '',
        partner_user_id: '',
        realm_id: '',
        profile_id: '',
        transfer_amount: '',
    }

    componentDidMount() {

        const cookie = new Cookies();
        RadiusApi.get('/dashboard/check_token.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    user_id: response.data.data.user.id
                })
            })
    }

    onTransactionComplete = () => {
        let data = this.state
        RadiusApi.post('/voucher-transactions/add.json', data)
            .then(response => {
                console.log(response)
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
                    <Link to='/admin/transaction'>
                        <button className='ui button'>Back</button>
                    </Link>
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
