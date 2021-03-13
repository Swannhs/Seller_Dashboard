import React, {Component} from 'react';
import Cookies from "universal-cookie";

class LoginAction extends Component {

    componentDidMount() {
        const cookie = new Cookies();

        if (cookie.get('Token')) {
            this.props.history.push(
                window.location.pathname !== '/' ?
                    this.props.history.push(window.location.pathname) : this.props.history.push('/admin/dashboard')
            )
        } else this.props.history.push('/login')
    }

    render() {
        return null
    }
}

export default LoginAction;
