import React, {Component} from 'react';
import {Redirect} from "react-router";

class Logout extends Component {
    componentDidMount() {
        console.log('Logout')
        localStorage.clear();
    }

    render() {
        return <Redirect to='/login'/>
    }
}

export default Logout;
