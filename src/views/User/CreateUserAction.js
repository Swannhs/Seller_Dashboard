import React, {Component} from 'react';
import './CreateUser.css';
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import CreateUserUi from "./CreateUserUI";

class CreateUserAction extends Component {

    onCreateUser = async data => {

        const cookie = new Cookies();

        await RadiusApi.post('/access-providers/add.json', data, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert('User is created successfully')
                    this.props.history.push('/admin/users/view')
                } else
                    alert(response.data.errors.username)
            })
    }


    render() {
        return (
            <CreateUserUi onFormSubmit={this.onCreateUser}/>
        );
    }
}

export default CreateUserAction;
