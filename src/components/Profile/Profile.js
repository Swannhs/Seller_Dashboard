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
                this.setState({
                    username: response.data.data.user.username,
                    group: response.data.data.user.group
                })
            })

    }

    onLogout = () => {
        const cookie = new Cookies;
        cookie.remove('Token', null)
        cookie.remove('Role', null)
        this.props.history.push('/')

    }

    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-1'>
                        <div className="ui text-right floated column">
                            <Link to='/admin/dashboard'>
                                <button className='ui button small'>Back</button>
                            </Link>
                        </div>
                    </div>

                    <div className='col'>
                        <div className="ui text-right floated column">
                            <Link to='/login'>
                                <button className="ui red button small" onClick={this.onLogout}>Log out</button>
                            </Link>
                        </div>
                    </div>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
