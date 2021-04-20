import React, {Component} from 'react';
import {Input} from "reactstrap";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {Link} from "react-router-dom";

class CreateTweak extends Component {
    state = {
        name: '',
        vendor: '',
        protocol: '',
        injectionType: '',
        payload: '',
        note: ''
    }

    onCreateTweak = event => {
        event.preventDefault();
        let data = this.state
        let cookie = new Cookies
        RadiusApi.post('/tweaks/add.json', data, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                if (response.data.status){
                    alert('Tweak Created');
                    this.props.history.push('/admin/root/tweak')
                }else {
                    alert(response.data.message)
                }
            })
    }

    render() {
        return (
            <div className='container'>
                <div className='ml-3'>
                    <Link to='/admin/root/tweak'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>
                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <form onSubmit={this.onCreateTweak}>
                        <h3>Name</h3>
                        <Input type='text'
                               placeholder='Define a name'
                               value={this.state.name}
                               onChange={event => {
                                   this.setState({
                                       name: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Vendor</h3>
                        <Input type='text'
                               placeholder='Enter vendor name'
                               value={this.state.vendor}
                               onChange={event => {
                                   this.setState({
                                       vendor: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Protocol</h3>
                        <Input type='text'
                               placeholder='Enter the protocol'
                               value={this.state.protocol}
                               onChange={event => {
                                   this.setState({
                                       protocol: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Injection Type</h3>
                        <Input type='text'
                               placeholder='Injection'
                               value={this.state.injectionType}
                               onChange={event => {
                                   this.setState({
                                       injectionType: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Payload</h3>
                        <Input type='text'
                               placeholder='Payload'
                               value={this.state.payload}
                               onChange={event => {
                                   this.setState({
                                       payload: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Note</h3>
                        <Input type='text'
                               placeholder='Note'
                               value={this.state.note}
                               onChange={event => {
                                   this.setState({
                                       note: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <button type='submit' className='ui button primary mt-4'>
                            Create
                        </button>
                    </form>

                </article>
            </div>
        );
    }
}

export default CreateTweak;
