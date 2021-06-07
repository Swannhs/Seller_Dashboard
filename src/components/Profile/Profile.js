import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Cookies from "universal-cookie/lib";

class Profile extends Component {
    state = {
        username: '',
        role: '',
    }

    componentDidMount() {
        this.setState({
            username: localStorage.getItem('Name'),
            role: localStorage.getItem('Role')
        })
    }

    onLogout = () => {
        localStorage.clear();
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
                                        <div className="mt-3">
                                            <Link to='/admin/change-password'>
                                                <button className='ui button green'>
                                                    Change Password
                                                </button>
                                            </Link>
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
