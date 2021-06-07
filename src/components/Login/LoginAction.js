import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";

class LoginAction extends Component {


    componentDidMount() {
        let token = localStorage.getItem('Token')
        if (token) {
            RadiusApi.get('/dashboard/check-token.json', {
                params: {
                    token: token
                }
            })
                .then(response => {
                    if (response.data.success) {
                        this.props.history.push(
                            window.location.pathname !== '/' ?
                                this.props.history.push(window.location.pathname) : this.props.history.push('/admin/dashboard')
                        )
                    } else {
                        localStorage.clear();
                        this.props.history.push('/login');
                    }
                })

        } else {
            localStorage.clear();
            this.props.history.push('/login');
        }
    }

    render() {
        return null
    }

}

export default LoginAction;
