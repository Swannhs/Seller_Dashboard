import React, {Component} from 'react';
import {Input} from "reactstrap";
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class CreateTweak extends Component {
    state = {
        name: '',
        vendor: '',
        protocol: '',
        injectionType: '',
        payload: '',
        targetPort: null,
        countryTag: '',
        networkTag: '',
        note: ''
    }

    onCreateTweak = event => {
        event.preventDefault();
        let data = this.state
        RadiusApi.post('/tweaks/add.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message);
                    this.props.history.push('/admin/root/tweak')
                } else {
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

                        <h3>Target Port</h3>
                        <Input type='text'
                               placeholder='Target Post'
                               value={this.state.targetPort}
                               onChange={event => {
                                   this.setState({
                                       targetPort: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Country Tag</h3>
                        <Input type='text'
                               placeholder='BD,PAK'
                               value={this.state.countryTag}
                               onChange={event => {
                                   this.setState({
                                       countryTag: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Network Tag</h3>
                        <Input type='text'
                               placeholder='GP,BNG'
                               value={this.state.networkTag}
                               onChange={event => {
                                   this.setState({
                                       networkTag: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Payload</h3>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"
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
