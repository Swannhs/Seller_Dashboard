import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import {isMobile} from "react-device-detect";

class Profile extends Component {
    state = {
        username: '',
        role: '',
        owner: '',
        loading: true
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.setState({
            username: localStorage.getItem('Name'),
            role: localStorage.getItem('Role')
        })

        RadiusApi.get('/dashboard/check-owner.json', {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    owner: response.data.owner,
                    loading: false
                })
            })
    }

    // onLogout = () => {
    //     localStorage.clear();
    //     this.props.history.push('/')
    // }

    render() {
        return (
            <>
                {
                    this.state.loading ? <div className="mt-5 ui active centered inline loader"/> :
                        <div className="container">
                            <div className='ui grid'>

                                <div className="four column row">
                                    <div className="left floated column">
                                        <Link to='/admin/dashboard'>
                                            <button className='ui button small'>Back</button>
                                        </Link>
                                    </div>
                                    {
                                        isMobile ? <></> :
                                            <div className="right floated column">
                                                <Link to='/admin/change-password'>
                                                    <button className='ui button green'>
                                                        Change Password
                                                    </button>
                                                </Link>
                                            </div>
                                    }

                                </div>


                                {/*<div className='col'>*/}
                                {/*    <div className="ui text-right floated column">*/}
                                {/*        <Link to='/login'>*/}
                                {/*            <button className="ui red button small" onClick={this.onLogout}>Log out</button>*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
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
                                                        <h4>{this.state.username}</h4>
                                                        <p className="text-secondary mb-1">Uplink: {this.state.owner}</p>
                                                    </div>

                                                    {
                                                        isMobile ?
                                                            <div className="mt-3">
                                                                <Link to='/admin/change-password'>
                                                                    <button className='ui button green'>
                                                                        Change Password
                                                                    </button>
                                                                </Link>
                                                            </div> : <></>
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </>
        );
    }

}

export default Profile;
