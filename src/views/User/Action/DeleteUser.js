import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import {AiFillDelete} from "react-icons/all";
import {Button} from "reactstrap";
import {confirmAlert} from "react-confirm-alert";
import {toast} from "react-toastify";

class DeleteUser extends Component {

    onDeleteConfirm = () => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete the user',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onDeleteUser(this.props.delId)
                },
                {
                    label: 'No',
                }
            ]
        });
    }


    onDeleteUser = (id) => {
        RadiusApi.post('/access-providers/delete.json', {'id': id}, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                    if (response.data.success){
                        // alert('User deleted successful.')
                        toast.error('User is deleted successful', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.props.refresh();
                    }else {
                        toast.warn('We can not delete this user', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            )
    }


    render() {
        return (
            <>
                <Button className='btn-sm btn-danger' onClick={this.onDeleteConfirm}>
                    <AiFillDelete />
                </Button>
            </>
        );
    }

}

export default DeleteUser;
