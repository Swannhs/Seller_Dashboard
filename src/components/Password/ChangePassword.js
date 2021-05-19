import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {Link} from "react-router-dom";

class ChangePassword extends Component {
    state = {
        previous: '',
        failed: null,
        password: '',
        confirm: '',
        match: null,
        username: '',
        loading: true
    }

    componentDidMount() {
        const cookie = new Cookies
        RadiusApi.get('/dashboard/check-token.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    username: response.data.data.user.username,
                    loading: false
                })
            })
    }


    onChangePassword() {
        const cookie = new Cookies
        let data = {
            password: this.state.password,
            confirm: this.state.confirm,
            sel_language: 4_4,
            token: cookie.get('Token')
        }
        RadiusApi.post('/dashboard/change_password.json', data)
            .then(response => {
                if (response.data.success) {
                    cookie.remove('Token')
                    cookie.set('Token', response.data.data.token)
                    alert('Password changed successfully')
                    this.props.history.push('/admin/dashboard')
                } else {
                    alert('Failed to change password')
                }
            })
    }

    onConfirmPassword = () => {
        event.preventDefault();
        if (this.state.password === this.state.confirm) {
            let data = {
                username: this.state.username,
                password: this.state.previous
            }
            RadiusApi.post('/dashboard/authenticate.json', data)
                .then(response => {
                    if (response.data.success) {
                        this.onChangePassword()
                    } else {
                        this.setState({
                            failed: true
                        })
                    }
                })
        } else {
            this.setState({
                match: true
            })
        }
    }

    onChangeHandle = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className='ml-3'>
                    <Link to='/admin/profile'>
                        <button className='ui button small'>Back</button>
                    </Link>
                </div>

                {
                    this.state.loading ? <div className="ui active centered inline loader mt-3"/> :

                        <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>


                            <form onSubmit={this.onConfirmPassword}>
                                {
                                    this.state.failed ? <p className='m-0 p-0 text-danger'>Password don't match</p> :
                                        <p className='m-0 p-0'>Previous Password</p>
                                }
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                    </div>
                                    <input className="form-control" placeholder="Previous password" type="password"
                                           name='previous'
                                           value={this.state.previous}
                                           onChange={event => this.onChangeHandle(event)}
                                           required={true}
                                    />
                                </div>

                                {
                                    this.state.match ? <p className='m-0 p-0 text-danger'>Password don't match</p> :
                                        <p className='m-0 p-0'>New Password</p>
                                }


                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                    </div>
                                    <input className="form-control" placeholder="Create password" type="password"
                                           name='password'
                                           value={this.state.password}
                                           onChange={event => this.onChangeHandle(event)}
                                           required={true}
                                    />
                                </div>

                                <p className='m-0 p-0'>Confirm Password</p>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                    </div>
                                    <input className="form-control" placeholder="Confirm password" type="password"
                                           name='confirm'
                                           value={this.state.confirm}
                                           onChange={event => this.onChangeHandle(event)}
                                           required={true}
                                    />
                                </div>


                                {/* form-group// */}
                                {/* form-group end.// */}

                                {/* form-group// */}
                                <div className="form-group">
                                    {/*<Link to='/admin/users/view'>*/}
                                    <button type="submit" className="ui button primary small">
                                        Change
                                    </button>
                                    {/*</Link>*/}
                                </div>
                            </form>
                        </article>
                }
            </div>
        );
    }
}

export default ChangePassword;
