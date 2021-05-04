import React, {Component} from 'react';
import Cookies from "universal-cookie";
import RadiusApi from "../../radius-api/RadiusApi";

class LoginAction extends Component {


    componentDidMount() {
        const cookie = new Cookies;

        if (cookie.get('Token') && cookie.get('Role')) {
            RadiusApi.get('/dashboard/check-token.json', {
                params: {
                    token: cookie.get('Token')
                }
            })
                .then(response => {
                    if (response.data.success) {
                        this.props.history.push(
                            window.location.pathname !== '/' ?
                                this.props.history.push(window.location.pathname) : this.props.history.push('/admin/dashboard')
                        )
                    } else {
                        cookie.remove('Token')
                        cookie.remove('Role')
                        this.props.history.push('/login');
                    }
                })

        } else {
            cookie.remove('Token')
            cookie.remove('Role')
            this.props.history.push('/login');
        }
    }

    render() {
        return null
    }

}

export default LoginAction;
