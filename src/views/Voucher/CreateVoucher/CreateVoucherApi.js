import React, {Component} from 'react';
import VoucherGroup from "../../../components/Dropdown/VoucherGroup";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import VoucherProfileAgent from "../../../components/Dropdown/VoucherProfileAgent";
import {toast, ToastContainer} from "react-toastify";
import {confirmAlert} from "react-confirm-alert";

class CreateVoucherApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '0', //unused, just for backend
            single_field: false,
            precede: '',
            realm_id: null,
            profile_id: null,
            quantity: null,
            never_expire: 'never_expire',
            token: localStorage.getItem('Token'),
            sel_language: 4_4,
            newData: []
        }
    }

    onSubmitVoucher = () => {
        event.preventDefault();
        let data = this.state;
        delete data.token;
        delete data.newData;

        let body = new FormData();

        body.append('user_id', this.state.user_id)
        body.append('single_field', this.state.single_field)
        body.append('precede', this.state.precede)
        body.append('realm_id', this.state.realm_id)
        body.append('profile_id', this.state.profile_id)
        body.append('quantity', this.state.quantity)
        body.append('never_expire', this.state.never_expire)
        body.append('sel_language', this.state.sel_language)


        RadiusApi.post('/vouchers/add.json', body, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    // alert('Voucher Created');
                    this.props.history.push({
                        pathname: '/admin/voucher/view',
                        state: {
                            search: response.data.batch
                        }
                    });
                    toast.success('Voucher(s) are created successfully', {
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

    onCreateVoucherConfirm = () => {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to create new vouchers',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onSubmitVoucher()
                },
                {
                    label: 'No',
                }
            ]
        });
    }


    onGroupHandle = async group => {
        this.setState({
            realm_id: group
        })
    }

    onProfileHandle = async profile => {
        this.setState({
            profile_id: profile
        })
    }


    render() {
        return (
            <>
            <ToastContainer/>
                <div className='ml-3'>
                    <Link to='/admin/voucher/view'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>


                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>

                    <h3 className="card-title mt-3 text-center p-3">Create Bulk Vouchers</h3>

                    <form onSubmit={this.onCreateVoucherConfirm}>
                        <VoucherGroup onChange={this.onGroupHandle}/>

                        <VoucherProfileAgent onChange={this.onProfileHandle}/>

                        <h4 className='mt-3 text-black-50'>Prefix</h4>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-table"/> </span>
                            </div>
                            <input className="form-control" placeholder="e.g. noman" type="text"
                                   value={this.state.precede}
                                   onChange={event => this.setState({precede: event.target.value.toLowerCase()})}
                                   required={true}
                                   pattern="[a-z]{1,5}"
                                   onInvalid={event => event.target.setCustomValidity('Prefix should only contain lowercase letters and max length 5. e.g. noman')}
                                   onInput={event => event.target.setCustomValidity('')}
                            />
                        </div>

                        <h4 className='mt-3 text-black-50'>Bulk Amount</h4>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-database"/> </span>
                            </div>
                            <input className="form-control" placeholder="e.g. 10" type="number" min="1" max="1000"
                                   value={this.state.quantity}
                                   onChange={event => this.setState({quantity: event.target.value})}
                                   required={true}
                            />
                        </div>

                        <button className='ui button primary mt-2'>
                            Create
                        </button>
                    </form>
                </article>

            </>
        );
    }

}

export default CreateVoucherApi;
