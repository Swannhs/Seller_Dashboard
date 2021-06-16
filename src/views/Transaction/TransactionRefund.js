import React, {Component} from 'react';
import {Link} from "react-router-dom";
import VoucherGroup from "../../components/Dropdown/VoucherGroup";
import VoucherProfile from "../../components/Dropdown/VoucherProfile";
import RadiusApi from "../../radius-api/RadiusApi";
import {confirmAlert} from "react-confirm-alert";
import AllUser from "../../components/Dropdown/AllUser";

class TransactionRefund extends Component {
    state = {
        id: 0,
        partner_user_id: '',
        realm_id: '',
        profile_id: '',
        transfer_amount: 0,
        role: '',
        error: {
            partner: '',
            balance: false
        }
    }

    componentDidMount() {
        this.setState({
            role: localStorage.getItem('Role')
        })
    }

    onRefundComplete = () => {
        let data = this.state
        delete data.error;
        delete data.role
        RadiusApi.post('/voucher-transactions/refund.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (localStorage.getItem('Role') === 'admin') {
                    if (response.data.success) {
                        alert(response.data.message)
                        this.props.history.push('/admin/root/voucher/transaction')
                    } else {
                        alert(response.data.message)
                    }
                } else {
                    if (response.data.success) {
                        alert(response.data.message)
                        this.props.history.push('/admin/voucher/transaction')
                    } else {
                        alert(response.data.message)
                    }
                }
            })
    }

    onRefundConfirm = () => {
        event.preventDefault();
        if (this.state.transfer_amount > 0) {
            confirmAlert({
                title: 'Confirm',
                message: 'Are you sure to refund',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => this.onRefundComplete()
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

    // componentDidMount() {
    //     RadiusApi.get('/balance-transactions/parent.json', {
    //         params: {
    //             token: localStorage.getItem('Token')
    //         }
    //     })
    //         .then(response => {
    //             this.setState({
    //                 partner_user_id: response.data.id,
    //                 partner_user_name: response.data.username
    //             })
    //         })
    // }

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
                        this.state.role === 'admin' ?
                            <Link to='/admin/root/voucher/transaction'>
                                <button className='ui button'>Back</button>
                            </Link> :
                            <Link to='/admin/voucher/transaction'>
                                <button className='ui button'>Back</button>
                            </Link>
                    }


                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>

                    <p className='d-inline-block'><h3 className='text-danger'>Note:</h3> You are going to retrieve
                        credits
                    </p>
                    <form onSubmit={this.onRefundConfirm}>
                        <AllUser onChange={this.onCreatePartner}/>
                        <VoucherGroup onChange={this.onCreateGroup}/>
                        <VoucherProfile onChange={this.onCreateProfile}/>

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

                        <button className='ui button green mt-2' type='submit'>
                            Refund
                        </button>
                    </form>
                </article>

            </div>
        );
    }
}

export default TransactionRefund;
