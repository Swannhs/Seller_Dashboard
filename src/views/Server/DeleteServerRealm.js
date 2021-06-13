import React, {Component} from 'react';
import {AiFillDelete} from "react-icons/all";
import RadiusApi from "../../radius-api/RadiusApi";
import {Button} from "reactstrap";

class DeleteServerRealm extends Component {
    onConfirmDelete = () => {
        confirm('Delete the server realm?') ? this.onDeleteRealmServer(this.props.delId): null
    }
    onDeleteRealmServer = (id) => {
        RadiusApi.post('/Server-realms/delete.json', {'id': id}, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                    if (response.data.success){
                        alert('Delete server_realm successful please refresh')
                        // props.history.push('/admin/Dashboard')
                    }else {
                        alert('Error to delete user')
                    }
                }
            )
    }
    render() {
        return (
            <Button className='btn-sm btn-danger' onClick={this.onConfirmDelete}>
                <AiFillDelete />
            </Button>
        );
    }
}

export default DeleteServerRealm;
