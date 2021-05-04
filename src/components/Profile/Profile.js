import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class Profile extends Component {
    state = {
        username: '',
        role: '',
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/Dashboard/checkToken.json', {

            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    username: response.data.data.user.username,
                    role: response.data.data.role
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
                        <Link to='/admin/dashboard'>
                            <div className="ui text-right floated column">
                                <button className='ui button small'>Back</button>
                            </div>
                        </Link>
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
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                             alt="Admin"
                                             className="rounded-circle" width={150}/>
                                        <div className="mt-3">
                                            <h4 className='text-capitalize'>{this.state.username}</h4>
                                            <p className="text-secondary mb-1 text-capitalize">{this.state.role}</p>
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
