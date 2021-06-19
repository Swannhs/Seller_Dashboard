import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

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
        RadiusApi.get('/dashboard/check-token.json', {
            params: {
                token: localStorage.getItem('Token')
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
        let data = {
            password: this.state.password,
            confirm: this.state.confirm,
            sel_language: 4_4,
            token: localStorage.getItem('Token')
        }
        RadiusApi.post('/dashboard/change_password.json', data)
            .then(response => {
                if (response.data.success) {
                    localStorage.removeItem('Token')
                    localStorage.setItem('Token', response.data.data.token)
                    this.props.history.push('/admin/dashboard')
                    toast.success('Password changed successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Failed to change password', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
            <>
                <ToastContainer/>
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
                                        this.state.failed ?
                                            <p className='m-0 p-0 text-danger'>Password don't match</p> :
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
            </>
        );
    }
}

export default ChangePassword;
