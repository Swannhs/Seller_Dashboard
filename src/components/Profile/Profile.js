import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class Profile extends Component {
    state = {
        username: '',
        group: ''
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/dashboard/checkToken.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                console.log(response.data.data)
                this.setState({
                    username: response.data.data.user.username,
                    group: response.data.data.user.group
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
                <div className="main-body mt-2 ml-3">
                    {/* Breadcrumb */}
                    {/*<nav aria-label="breadcrumb" className="main-breadcrumb">*/}
                    {/*    <ol className="breadcrumb">*/}
                    {/*        <li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
                    {/*        <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>*/}
                    {/*        <li className="breadcrumb-item active" aria-current="page">User Profile</li>*/}
                    {/*    </ol>*/}
                    {/*</nav>*/}
                    {/* /Breadcrumb */}
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                             alt="Admin"
                                             className="rounded-circle" width={150}/>
                                        <div className="mt-3">
                                            <h4>{this.state.username}</h4>
                                            <p className="text-secondary mb-1">{this.state.group}</p>
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
                                            Kenneth Valdez
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            fip@jukmuh.al
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            (239) 816-9029
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Mobile</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            (320) 380-4539
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            Bay Area, San Francisco, CA
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
