import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Input} from "reactstrap";
import AllUser from "../Transaction/AllUser";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import VoucherGroup from "../Voucher/CreateVoucher/VoucherGroup";
import VoucherProfile from "../Voucher/CreateVoucher/VoucherProfile";

class CashTransfer extends Component {
    state = {
        partner_user_id: '',
        paid: '',
        realm_id: '',
        profile_id: '',

    }

    onCashTransaction = () => {
        const cookie = new Cookies()
        let data = this.state
        RadiusApi.post('/balance-transaction-details/add.json', data, {
            params: {
                token : cookie.get('Token')
            }
        })
            .then(response => {
                console.log(response)
                // if (response.data.success){
                //     alert('Transfer cash successfully')
                //     this.props.history.push('/admin/cash/transaction')
                // }
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
                    <Link to='/admin/cash/transaction'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>

                    <AllUser onChange={this.onCreatePartner}/>
                    <VoucherGroup onChange={this.onCreateGroup}/>
                    <VoucherProfile onChange={this.onCreateProfile}/>
                    <Input type='number'
                           placeholder='The amount you want to transfer'
                           value={this.state.paid}
                           onChange={event => {
                               this.setState({
                                   paid: event.target.value
                               })
                           }}
                           required={true}
                    />


                    <button className='ui button primary'
                            onClick={this.onCashTransaction}
                    >
                        Transfer
                    </button>
                </article>
            </div>
        );
    }
}

export default CashTransfer;
