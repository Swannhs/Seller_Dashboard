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
            quantity: 0,
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
        const cookie = new Cookies;
        RadiusApi.post('/vouchers/add.json', this.state)
            .then(response => {
                response.data.success ? alert('Voucher Created') : alert(response.data.message)
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


                <div className='pt-5'>
                    <VoucherGroup onChange={this.onGroupHandle}/>
                    <VoucherProfile onChange={this.onProfileHandle}/>

                    <h3 className='mt-3 pl-3 text-black-50'>How Many?</h3>
                    <div className="input-group pl-3 w-50">
                        <input type="number" className="form-control" aria-label="Username"
                               aria-describedby="basic-addon1"
                               value={this.state.quantity}
                               onChange={event => this.setState({quantity: event.target.value})}
                        />
                    </div>
                    <h3 className='mt-3 pl-3 text-black-50'>Precede Name</h3>
                    <div className="input-group pl-3 w-50">
                        <input type="text" className="form-control" aria-label="Username" required='true'
                               aria-describedby="basic-addon1"
                               value={this.state.precede}
                               onChange={event => this.setState({precede: event.target.value})}
                        />
                    </div>

                    <h3 className='mt-3 pl-3 text-black-50'>Batch Name</h3>
                    <div className="input-group pl-3 w-50">
                        <input type="text" className="form-control" aria-label="Username" required='true'
                               aria-describedby="basic-addon1"
                               value={this.state.batch}
                               onChange={event => this.setState({batch: event.target.value})}
                        />
                    </div>
                    <button onClick={this.onSubmitVoucher} className='ui button primary m-3'>
                        Create
                    </button>
                </div>

            </>
        );
    }
}

export default CreateVoucherApi;
