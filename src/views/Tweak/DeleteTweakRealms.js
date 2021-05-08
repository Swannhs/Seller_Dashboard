import React, {Component} from 'react';
import {AiFillDelete} from "react-icons/all";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import {Button} from "reactstrap";

class DeleteTweakRealms extends Component {
    onConfirmDelete = () => {
        confirm('Delete the tweak realm?') ? this.onDeleteTweakRealm(this.props.delId): null
    }
    onDeleteTweakRealm = (id) => {
        const cookie = new Cookies;
        RadiusApi.post('/Tweak-realms/delete.json', {'id': id}, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                    if (response.data.success){
                        alert('Delete tweak_realm successful please refresh')
                        // props.history.push('/admin/Dashboard')
                    }else {
                        alert('Error to delete user')
                    }
                }
            )
    }
    render() {
        return (
            <>
                <Button className='btn-sm btn-danger' onClick={this.onConfirmDelete}>
                    <AiFillDelete />
                </Button>
            </>
        );
    }
}

export default DeleteTweakRealms;
