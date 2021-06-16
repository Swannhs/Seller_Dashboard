import React, {Component} from 'react';
import VoucherGroup from "../../../components/Dropdown/VoucherGroup";
import VoucherProfile from "../../../components/Dropdown/VoucherProfile";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class CreateVoucherApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
            single_field: true,
            precede: '',
            realm_id: null,
            profile_id: null,
            quantity: null,
            pwd_length: 5,
            never_expire: 'never_expire',
            extra_name: '',
            extra_value: '',
            token: localStorage.getItem('Token'),
            sel_language: 4_4
        }
    }

    onSubmitVoucher = () => {
        event.preventDefault();
        RadiusApi.post('/vouchers/add.json', this.state, {
            params: {
                token: localStorage.getItem('Token')
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

                    <h3 className="card-title mt-3 text-center p-3">Bulk Create Voucher</h3>

                    <form onSubmit={this.onSubmitVoucher}>
                        <VoucherGroup onChange={this.onGroupHandle}/>
                        <VoucherProfile onChange={this.onProfileHandle}/>

                        <h4 className='mt-3 text-black-50'>Bulk Amount</h4>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-database"/> </span>
                            </div>
                            <input className="form-control" placeholder="ex: 10" type="number" max="1000"
                                   value={this.state.quantity}
                                   onChange={event => this.setState({quantity: event.target.value})}
                                   required={true}
                            />
                        </div>


                        <h4 className='mt-3 text-black-50'>Prefix</h4>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-table"/> </span>
                            </div>
                            <input className="form-control" placeholder="ex: abc, format: [a-z]{1-5}" type="text"
                                   value={this.state.precede}
                                   onChange={event => this.setState({precede: event.target.value.toLowerCase()})}
                                   required={true}
                                   pattern="[a-z]{1,5}"
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
