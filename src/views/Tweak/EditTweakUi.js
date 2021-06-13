import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import {Input} from "reactstrap";

class EditTweakUi extends Component {
    state = {
        id: 0,
        name: '',
        vendor: '',
        protocols: '',
        injection_type: '',
        payload: '',
        note: '',
        // redirect: false
    }
    componentDidMount() {
        RadiusApi.get('/tweaks/view.json', {
            params: {
                id: this.props.id,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    id: response.data.data.id,
                    name: response.data.data.name,
                    vendor: response.data.data.vendor,
                    protocols: response.data.data.protocols,
                    injection_type: response.data.data.injection_type,
                    payload: response.data.data.payload,
                    note: response.data.data.note
                })
            })
    }

    onCreateTweak = event => {
        event.preventDefault();
        let data = this.state
        RadiusApi.post('/tweaks/update.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.status){
                    this.setState({
                        redirect: true
                    })
                    alert('Tweak Update successfully');
                }else {
                    alert(response.data.message)
                }
            })
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to='/admin/users/view'/>;
        // }
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
                               value={this.state.protocols}
                               onChange={event => {
                                   this.setState({
                                       protocols: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Injection Type</h3>
                        <Input type='text'
                               placeholder='Injection'
                               value={this.state.injection_type}
                               onChange={event => {
                                   this.setState({
                                       injection_type: event.target.value
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

                        <button type='submit' className='ui button positive mt-4'>
                            Update
                        </button>
                    </form>

                </article>
            </div>
        );
    }
}

export default EditTweakUi;
