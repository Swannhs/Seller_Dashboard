import React, {Component} from 'react';
import './CreateUser.css';
import RadiusApi from "../../radius-api/RadiusApi";
import CreateUserUi from "./CreateUserUI";
import {confirmAlert} from "react-confirm-alert";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateUserAction extends Component {

    onCreateUser = data => {
        RadiusApi.post('/access-providers/add.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    // alert('User is created successfully')

                    this.props.history.push('/admin/users/view')
                    toast.success('User is created successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else{
                    // alert(response.data.errors.username)

                    toast.error(response.data.errors.username, {
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
            <>
                <ToastContainer/>
                <CreateUserUi onFormSubmit={this.onCreateUserConfirm}/>
            </>
        );
    }
}

export default CreateUserAction;
