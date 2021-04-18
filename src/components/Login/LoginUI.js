import React, {Component} from 'react';
import './Login.css';
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from 'universal-cookie';


class LoginUI extends Component {

    state = {
        username: '',
        password: '',
        errors: '',
        network: '',
        click: false,
        inactive: ''
    }


    coChangeLoading = () => {
        this.setState({
            click: true
        })
    }

    onLoginSubmit = async event => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        await RadiusApi.post('/dashboard/authenticate.json', data)
            .then(response => {

                // Get the token
                // console.log(response.data.errors)

                const cookies = new Cookies();

                if (response.data.errors){
                    this.setState({errors: response.data.errors})

                }else {
                    if (response.data.data.active) {
                        cookies.set('Token', response.data.data.token);
                        this.props.history.push('/admin/dashboard')
                    } else {
                        this.setState({inactive: true})
                    }
                }
            })
            .catch(error => {
                this.setState({
                    network: error
                })
            });
    }


    render() {

        return (
            <div className='login-container'>
                <h1 className='heading-text'>Admin Dashboard</h1>
                <div className="wrapper-login fadeInDown">
                    <div id="formContent">
                        {
                            this.state.errors ? <div className="alert alert-danger">
                                Invalid username or password
                            </div> : null
                        }
                        {
                            this.state.network ? <div className="alert alert-danger">
                                Invalid response try again later
                            </div> : null
                        }
                        {
                            this.state.inactive ? <div className="alert alert-danger">
                                You are not enable
                            </div> : null
                        }

                        {/*<div className="alert alert-info">*/}
                        {/*    You have been logged out.*/}
                        {/*</div>*/}
                        <form action={this.onLoginSubmit}>
                            <input type="text" id="login" className="fadeIn second" name="username"
                                   placeholder="User Name" value={this.state.username}
                                   onChange={event => this.setState({username: event.target.value})}
                            />
                            <input type="password" id="password" className="fadeIn third" name="password"
                                   placeholder="Password" value={this.state.password}
                                   onChange={event => this.setState({password: event.target.value})}
                            />
                            <input type="submit" className="fadeIn fourth" defaultValue="Log In"
                                   value={this.state.click ? "Loading......"
                                       : 'Login'} onClick={this.onLoginSubmit}
                            />
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default LoginUI;
