import React, {Component} from 'react';
import './CreateVoucher.css';
import CreateProfileUI from "./CreateProfileUI";
import RadiusApi from "../../radius-api/RadiusApi";


class CreateProfile extends Component {

    onCreateVoucher = async data => {

        await RadiusApi.post('/profiles/simple_add.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => console.log(response))
    }

    render() {
        return (
            <>
                <CreateProfileUI onFormSubmit={this.onCreateVoucher}/>
            </>
        );
    }
}

export default CreateProfile;
