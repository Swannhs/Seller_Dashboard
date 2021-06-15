import React, {Component} from 'react';
import {AiFillDelete} from "react-icons/all";
import RadiusApi from "../../radius-api/RadiusApi";
import {Button} from "reactstrap";
import {Redirect} from "react-router";

class DeleteTweakRealms extends Component {

    state = {
        redirect: false
    }
    onConfirmDelete = () => {
        confirm('Delete the tweak realm?') ? this.onDeleteTweakRealm(this.props.delId) : null
    }
    onDeleteTweakRealm = (id) => {
        RadiusApi.post('/Tweak-realms/delete.json', {'id': id}, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                    if (response.data.success) {
                        alert('Delete tweak_realm successful')
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
        if (this.state.redirect){
            return <Redirect to='/admin/root/tweak'/>
        }
        return (
            <Button className='btn-sm btn-danger' onClick={this.onConfirmDelete}>
                <AiFillDelete/>
            </Button>
        );
    }
}

export default DeleteTweakRealms;
