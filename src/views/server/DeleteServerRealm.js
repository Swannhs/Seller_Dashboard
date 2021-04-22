import React, {Component} from 'react';
import {AiFillDelete} from "react-icons/all";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";

class DeleteServerRealm extends Component {
    onConfirmDelete = () => {
        confirm('Delete the user?') ? this.onDeleteRealmServer(this.props.delId): null
    }
    onDeleteRealmServer = (id) => {
        const cookie = new Cookies;
        RadiusApi.post('/server-realms/delete.json', {'id': id}, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                    if (response.data.success){
                        alert('Delete server_realm successful please refresh')
                        // props.history.push('/admin/dashboard')
                    }else {
                        alert('Error to delete user')
                    }
                }
            )
    }
    render() {
        return (
            <AiFillDelete onClick={this.onConfirmDelete}/>
        );
    }
}

export default DeleteServerRealm;
