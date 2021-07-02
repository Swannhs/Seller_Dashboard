import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import {Input} from "reactstrap";
import {Redirect} from "react-router";

class EditTweakUi extends Component {
    state = {
        id: 0,
        name: '',
        vendor: '',
        protocols: '',
        injection_type: '',
        sni: '',
        payload: '',
        target_port: '',
        country_tags: '',
        network_tags: '',
        note: '',
        redirect: false
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
                    sni: response.data.data.sni,
                    payload: response.data.data.payload,
                    target_port: response.data.data.target_port,
                    country_tags: response.data.data.country_tags,
                    network_tags: response.data.data.network_tags,
                    note: response.data.data.note
                })
            })
    }

    onUpdateTweak = event => {
        event.preventDefault();
        let data = this.state
        delete data.redirect;
        RadiusApi.post('/tweaks/update.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success){
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
        if (this.state.redirect) {
            return <Redirect to='/admin/root/tweak'/>;
        }
        return (
            <div className='container'>
                <div className='ml-3'>
                    <Link to='/admin/root/tweak'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>
                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <form onSubmit={this.onUpdateTweak}>
                    <h3>Name</h3>
                        <Input type='text'
                               placeholder='ex: Mobily Free'
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
                               placeholder='ex: MOBILY'
                               value={this.state.vendor}
                               onChange={event => {
                                   this.setState({
                                       vendor: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Protocols</h3>
                        <Input type='text'
                               placeholder='ex: TCP'
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
                               placeholder='ex: PROXY'
                               value={this.state.injection_type}
                               onChange={event => {
                                   this.setState({
                                       injection_type: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>SNI (SSL)</h3>
                        <Input type='text'
                               placeholder='ex: google.com'
                               value={this.state.sni}
                               onChange={event => {
                                   this.setState({
                                       sni: event.target.value
                                   })
                               }}
                               required={true}
                        />


                        <h3>Payload (PROXY)</h3>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"
                                placeholder='ex: GET / HTTP/1.1[crlf]Host: facebook.com[crlf][crlf]'
                                value={this.state.payload}
                                onChange={event => {
                                    this.setState({
                                        payload: event.target.value
                                    })
                                }}
                                required={true}
                        />

                        <h3>Target Port</h3>
                        <Input type='text'
                               placeholder='ex: 443 [0 to ignore]'
                               value={this.state.target_port}
                               onChange={event => {
                                   this.setState({
                                       target_port: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Country Tags</h3>
                        <Input type='text'
                               placeholder='ex: BD,PAK'
                               value={this.state.country_tags}
                               onChange={event => {
                                   this.setState({
                                       country_tags: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Network Tags</h3>
                        <Input type='text'
                               placeholder='ex: GP,BNG'
                               value={this.state.network_tags}
                               onChange={event => {
                                   this.setState({
                                       network_tags: event.target.value
                                   })
                               }}
                               required={true}
                        />

                        <h3>Note</h3>
                        <Input type='text'
                               placeholder='ex: Send VB to 8888'
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
