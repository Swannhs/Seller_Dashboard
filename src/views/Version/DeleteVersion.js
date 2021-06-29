import React, {Component} from 'react';
import {AiFillDelete} from "react-icons/all";
import {Button} from "reactstrap";
import RadiusApi from "../../radius-api/RadiusApi";
import {confirmAlert} from "react-confirm-alert";

class DeleteVersion extends Component {

    onDeleteConfirm = () => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete this version',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onDeleteVersion(this.props.id)
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    onDeleteVersion = (id) => {
        RadiusApi.post('/versions/delete.json', {'id': id}, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                    if (response.data.success) {
                        alert('Delete version successful')
                        this.props.refresh();
                    } else {
                        alert('Error to delete version')
                    }
                }
            )
    }

    render() {
        return (
            <Button className='btn-sm btn-danger' onClick={this.onDeleteConfirm}>
                <AiFillDelete/>
            </Button>
        );
    }
}

export default DeleteVersion;
