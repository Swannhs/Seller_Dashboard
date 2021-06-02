import React, {Component} from 'react';
import './style.css';
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";


class LoginUi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: '',
            network: '',
            inactive: '',
            loading: false,
            imageUrl: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('static/image/logo.png')
            .then(data => {
                this.setState({
                    imageUrl: data.url
                })
            });
    }


    handleSubmit = async event => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        await RadiusApi.post('/dashboard/authenticate.json', data)
            .then(response => {

                const cookies = new Cookies();

                if (response.data.errors) {
                    this.setState({errors: response.data.errors})
                    this.setState({loading: false})
                } else {
                    if (response.data.data.active) {
                        cookies.set('Name', response.data.data.user.username)
                        cookies.set('Role', response.data.data.role)
                        cookies.set('Token', response.data.data.token);
                        this.props.history.push('/admin/dashboard')
                    } else {
                        this.setState({inactive: true})
                    }
                }
            })
            .catch(error => {
                this.setState({
                    network: error,
                    loading: false
                })
            });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className='login'>
                <div className="limiter">
                    <div className="box">
                        <div className='heading'>

                        <span className="login100-form-avatar">
                            <img src={this.state.imageUrl} alt='Logo'/>
                        </span>
                            <span className="login100-form-title p-b-70">
                                    Welcome
                        </span>
                        </div>
                        <div className="container-login100">
                            <div className="wrap-login100 p-t-85 p-b-20">
                                <form className="login100-form validate-form" onSubmit={this.handleSubmit}>

                                    <div className="wrap-input100 validate-input m-t-85 m-b-35"
                                         data-validate="Enter username">
                                        <input className="input100" type="text" name="username"
                                               placeholder='Username'
                                               value={this.state.username}
                                               onChange={this.handleChange}/>
                                        <span className="focus-input100" placeholder="Username"/>
                                    </div>


                                    <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                                        <input className="input100" type="password" name="password"
                                               placeholder='Password'
                                               value={this.state.password}
                                               onChange={this.handleChange}/>
                                        <span className="focus-input100" placeholder="Password"/>
                                    </div>
                                    {
                                        this.state.errors ?
                                            <p className='text-danger'>Invalid username or password</p> : null
                                    }
                                    <div className="container-login100-form-btn">
                                        {
                                            this.state.loading ?
                                                <button className="fluid ui primary loading button">Loading</button> :
                                                <button className="fluid ui button primary"
                                                        onClick={() => {
                                                            this.setState({loading: true})
                                                        }}>
                                                    Login
                                                </button>
                                        }

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default LoginUi;
