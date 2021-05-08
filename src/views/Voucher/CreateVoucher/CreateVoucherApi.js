import React, {Component} from 'react';
import VoucherGroup from "./VoucherGroup";
import VoucherProfile from "./VoucherProfile";
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {Link} from "react-router-dom";

class CreateVoucherApi extends Component {
    constructor(props) {
        super(props);
        let cookie = new Cookies

        this.state = {
            user_id: 0,
            single_field: true,
            precede: '',
            realm_id: null,
            profile_id: null,
            quantity: null,
            pwd_length: 5,
            batch: '',
            never_expire: 'never_expire',
            extra_name: '',
            extra_value: '',
            token: cookie.get('Token'),
            sel_language: 4_4
        }
    }

    onSubmitVoucher = () => {
        event.preventDefault();
        const cookie = new Cookies;
        RadiusApi.post('/vouchers/add.json', this.state, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert('Voucher Created');
                    this.props.history.push('/admin/voucher/view')
                } else {
                    alert(response.data.message)
                }
            })
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
                <div className='ml-3'>
                    <Link to='/admin/voucher/view'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>


                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>

                    <h2 className="card-title mt-3 text-center p-3">Create Voucher</h2>

                    <form onSubmit={this.onSubmitVoucher}>
                        <VoucherGroup onChange={this.onGroupHandle}/>
                        <VoucherProfile onChange={this.onProfileHandle}/>

                        <h3 className='mt-3 text-black-50'>How Many?</h3>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-database"/> </span>
                            </div>
                            <input className="form-control" placeholder="Quantity" type="number"
                                   value={this.state.quantity}
                                   onChange={event => this.setState({quantity: event.target.value})}
                                   required={true}
                            />
                        </div>


                        <h3 className='mt-3 text-black-50'>Precede Name</h3>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-table"/> </span>
                            </div>
                            <input className="form-control" placeholder="Precede" type="text"
                                   value={this.state.precede}
                                   onChange={event => this.setState({precede: event.target.value})}
                                   required={true}
                                   pattern="[a-z]"
                            />
                        </div>

                        <h3 className='mt-3 text-black-50'>Batch Name</h3>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"/> </span>
                            </div>
                            <input className="form-control" placeholder="Branch" type="text"
                                   value={this.state.batch}
                                   onChange={event => this.setState({batch: event.target.value})}
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
