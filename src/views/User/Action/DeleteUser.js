import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import {AiFillDelete} from "react-icons/all";
import {Button} from "reactstrap";
import {confirmAlert} from "react-confirm-alert";

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
                        alert('User deleted successful.')
                        this.props.refresh();
                    }else {
                        alert('Error to delete the user')
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
