import React, {Component} from 'react';
import './CreateUser.css';
import RadiusApi from "../../radius-api/RadiusApi";
import CreateUserUi from "./CreateUserUI";
import {confirmAlert} from "react-confirm-alert";

class CreateUserAction extends Component {

    onCreateUser = data => {
        RadiusApi.post('/access-providers/add.json', data, {
            params: {
                token: localStorage.getItem('Token')
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

    onCreateUserConfirm = async data => {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to create new user',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onCreateUser(data)
                },
                {
                    label: 'No',
                }
            ]
        });
    }


    render() {
        return (
            <CreateUserUi onFormSubmit={this.onCreateUserConfirm}/>
        );
    }
}

export default CreateUserAction;
