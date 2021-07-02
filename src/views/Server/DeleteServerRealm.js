import React, {Component} from 'react';
import {AiFillDelete} from "react-icons/all";
import RadiusApi from "../../radius-api/RadiusApi";
import {Button} from "reactstrap";
import {Redirect} from "react-router";

class DeleteServerRealm extends Component {
    state = {
        redirect: false
    }
    onConfirmDelete = () => {
        confirm('Are you sure to delete the server & realm mapping?') ? this.onDeleteRealmServer(this.props.delId) : null
    }
    onDeleteRealmServer = (id) => {
        RadiusApi.post('/server-realms/delete.json', {'id': id}, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                    if (response.data.success) {
                        alert('Server & Realm mapping deleted successfully.')
                        this.setState({
                            redirect: true
                        })
                    } else {
                        alert('Error to delete user')
                    }
                }
            )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/admin/root/server-realms'/>
        }
        return (
            <Button className='btn-sm btn-danger' onClick={this.onConfirmDelete}>
                <AiFillDelete/>
            </Button>
        );
    }
}

export default DeleteServerRealm;
