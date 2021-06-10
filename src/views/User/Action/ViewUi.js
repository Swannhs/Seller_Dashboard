import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../../radius-api/RadiusApi";

class ViewUi extends Component {
    state = {
        username: '',
        role: '',
        active: false,
        fullName: '',
        email: '',
        address: '',
        phone: '',
        loading: true
    }

    componentDidMount() {
        RadiusApi.get('/access-providers/view.json', {
            params: {
                token: localStorage.getItem('Token'),
                ap_id: this.props.id
            }
        })
            .then(response => {
                this.setState({
                    username: response.data.data.username,
                    role: response.data.data.role,
                    active: response.data.data.active,
                    fullName: response.data.data.name,
                    phone: response.data.data.phone,
                    address: response.data.data.address,
                    email: response.data.data.email,
                    loading: false
                })
            })
    }

    render() {
        return (
            <div className="container">
                <div className='ml-3'>
                    <Link to='/admin/users/view'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>
                <>
                    {
                        this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                            <div className="main-body mt-2 ml-3">
                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                         alt="Admin"
                                                         className="rounded-circle" width={150}/>
                                                    <div className="mt-3">
                                                        <h4>User Name: {this.state.username}</h4>
                                                    </div>
                                                    <div className="mt-3">
                                                        <h4 className='text-capitalize'>Role: {this.state.role}</h4>
                                                    </div>
                                                    <div className="mt-3">Status:
                                                        {this.state.active ?
                                                            <span className='text-success'>Active</span> :
                                                            <span className='text-danger'>Inactive</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Full Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.fullName}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.email}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Phone</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.phone}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Address</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </>
            </div>


        );
    }
}

export default ViewUi;
