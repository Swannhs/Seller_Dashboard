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
        confirm('Delete the server realm?') ? this.onDeleteRealmServer(this.props.delId) : null
    }
    onDeleteRealmServer = (id) => {
        RadiusApi.post('/Server-realms/delete.json', {'id': id}, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                    if (response.data.success) {
                        alert('Delete server_realm successful')
                        this.setState({
                            redirect: true
                        })
                        // props.history.push('/admin/Dashboard')
                    } else {
                        alert('Error to delete user')
                    }
                }
            )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/admin/root/server'/>
        }
        return (
            <Button className='btn-sm btn-danger' onClick={this.onConfirmDelete}>
                <AiFillDelete/>
            </Button>
        );
    }
}

export default DeleteServerRealm;
