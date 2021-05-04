import React, {Component} from 'react';
import Cookies from "universal-cookie";
import RadiusApi from "../../radius-api/RadiusApi";

class LoginAction extends Component {
    state = {
        loading: true
    }


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
                        this.setState({
                            loading: false
                        })
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
        return <>
            {this.state.loading ? <div className="mt-5 ui active centered inline loader mt-3"/> : <></>}
        </>
    }

}

export default LoginAction;
