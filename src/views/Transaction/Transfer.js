import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AllUser from "../../components/Dropdown/AllUser";
import RadiusApi from "../../radius-api/RadiusApi";
import VoucherGroup from "../../components/Dropdown/VoucherGroup";
import {confirmAlert} from "react-confirm-alert";
import VoucherProfileAgent from "../../components/Dropdown/VoucherProfileAgent";

class Transfer extends Component {
    state = {
        id: 0,
        partner_user_id: '',
        realm_id: '',
        profile_id: '',
        transfer_amount: 0,
        quantity_rate: 0,
        error: {
            partner: '',
            balance: false
        }
    }


    onTransactionComplete = () => {
        event.preventDefault();

        let data = this.state
        delete data.error;
        delete data.role;
        RadiusApi.post('/voucher-transactions/add.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (localStorage.getItem('Role') === 'admin') {
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

    onTransactionConfirm = () => {
        event.preventDefault();
        if (this.state.transfer_amount > 0) {
            confirmAlert({
                title: 'Confirm',
                message: 'Are you sure to transfer',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => this.onTransactionComplete()
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        } else {
            this.setState({
                error: {
                    balance: true
                }
            })
        }
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
                        localStorage.getItem('Role') === 'admin' ?
                            <Link to='/admin/root/voucher/transaction'>
                                <button className='ui button'>Back</button>
                            </Link> : <Link to='/admin/voucher/transaction'>
                                <button className='ui button'>Back</button>
                            </Link>
                    }

                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <form onSubmit={this.onTransactionConfirm}>
                        <AllUser onChange={this.onCreatePartner}/>
                        <p className='text-danger'>{this.state.error.partner}</p>
                        <VoucherGroup onChange={this.onCreateGroup}/>
                        <VoucherProfileAgent onChange={this.onCreateProfile}/>

                        <h4 className='text-black-50'>Vouchers</h4>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-euro-sign"/>
                                </span>
                            </div>
                            <input className="form-control" placeholder="Amount" type="number"
                                   value={this.state.transfer_amount}
                                   onChange={event => {
                                       this.setState({
                                           transfer_amount: event.target.value
                                       })
                                   }}
                                   required={true}
                            />
                        </div>

                        {
                            this.state.error.balance ?
                                <p className='text-danger'>Please add minimum balance</p>
                                : <></>
                        }


                        {/*<h4 className='text-black-50'>Amount Per Quantity rate</h4>*/}
                        {/*<div className="form-group input-group">*/}
                        {/*    <div className="input-group-prepend">*/}
                        {/*        <span className="input-group-text">*/}
                        {/*            <i className="fas fa-dollar-sign"/>*/}
                        {/*        </span>*/}
                        {/*    </div>*/}
                        {/*    <input className="form-control" placeholder="Rate" type="number"*/}
                        {/*           value={this.state.quantity_rate}*/}
                        {/*           onChange={event => {*/}
                        {/*               this.setState({*/}
                        {/*                   quantity_rate: event.target.value*/}
                        {/*               })*/}
                        {/*           }}*/}
                        {/*           required={true}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <button className='ui button primary mt-2' type='submit'>
                            Transfer
                        </button>
                    </form>
                </article>

            </div>
        );
    }
}

export default Transfer;
