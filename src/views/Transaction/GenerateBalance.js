import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import VoucherGroup from "../../components/Dropdown/VoucherGroup";
import VoucherProfile from "../../components/Dropdown/VoucherProfile";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

class GenerateBalance extends Component {
    state = {
        transfer_amount: '',
        realm_id: '',
        profile_id: '',
        quantity_rate: 0,
        partner_user_id: 44
    }


    onGenerate = () => {
        let data = this.state
        RadiusApi.post('/voucher-transactions/generate.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    this.props.history.push('/admin/root/voucher/transaction')
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
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
            <>
                <ToastContainer/>
                <div className='container'>
                    <div className='ml-3'>
                        <Link to='/admin/root/voucher/transaction'>
                            <button className='ui button'>Back</button>
                        </Link>
                    </div>
                    <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                        <VoucherGroup onChange={this.onCreateGroup}/>
                        <VoucherProfile onChange={this.onCreateProfile}/>

                        <h4 className='mt-3 text-black-50'>Amount</h4>

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

                        {/*<h4 className='mt-3 text-black-50'>Quantity Rate</h4>*/}

                        {/*<div className="form-group input-group">*/}
                        {/*    <div className="input-group-prepend">*/}
                        {/*        <span className="input-group-text"> <i className="fa fa-table"/> </span>*/}
                        {/*    </div>*/}
                        {/*    <input className="form-control" placeholder="Rate" type="text"*/}
                        {/*           value={this.state.quantity_rate}*/}
                        {/*           onChange={event => this.setState({quantity_rate: event.target.value})}*/}
                        {/*           required={true}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <button className='ui button positive mt-2' onClick={this.onGenerate}>
                            Generate
                        </button>
                    </article>
                </div>
            </>
        );
    }
}

export default GenerateBalance;
