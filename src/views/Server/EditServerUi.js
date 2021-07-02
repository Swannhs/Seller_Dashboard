import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link, Redirect} from "react-router-dom";
import {Form} from "react-bootstrap";

class EditServerUi extends Component {
    state = {
        id: 0,
        type: '',
        name: '',
        cc: '',
        ip: '',
        ssl_port: '',
        proxy_port: '',
        api_server_port: '',
        open_ports: '',
        country_tags: '',
        network_tags: '',
        note: '',
        redirect: false
    }

    componentDidMount() {
        RadiusApi.get('/servers/view.json', {
            params: {
                id: this.props.id,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    id: response.data.data.id,
                    type: response.data.data.type,
                    name: response.data.data.name,
                    cc: response.data.data.cc,
                    ip: response.data.data.ip,
                    ssl_port: response.data.data.ssl_port,
                    proxy_port: response.data.data.proxy_port,
                    api_server_port: response.data.data.api_server_port,
                    open_ports: response.data.data.open_ports,
                    country_tags: response.data.data.country_tags,
                    network_tags: response.data.data.network_tags,
                    note: response.data.data.note
                })
            })
    }

    onUpdateServer = event => {
        event.preventDefault();
        let data = this.state
        delete data.redirect;

        RadiusApi.post('/servers/update.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        redirect: true
                    })
                    alert(response.data.message)

                } else {
                    alert(response.data.message)
                    this.setState({
                        error: {
                            balance: response.data.message
                        }
                    })
                }
            })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/admin/root/server'/>;
        }

        return (
            <>
                <div className='ml-3'>
                    <Link to='/admin/root/server'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>

                <article className="card-body mx-auto" style={{maxWidth: '650px', fontSize: '20px'}}>
                    <div className='pt-5'>
                        <form onSubmit={this.onUpdateServer}>


                            <h3 className='mt-3 pl-3 text-black-50'>Type</h3>
                            <div className="input-group pl-3 w-50">
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    id="inlineFormCustomSelect"
                                    custom
                                    name='type'
                                    value={this.state.type}
                                    onChange={event => {
                                        this.setState({
                                            type: event.target.value
                                        })
                                    }}
                                >
                                    <option>Choose</option>
                                    <option>FREE</option>
                                    <option>REGULAR</option>
                                    <option>PREMIUM</option>
                                </Form.Control>
                            </div>


                            <h3 className='mt-3 pl-3 text-black-50'>Name</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="Name"
                                       aria-describedby="basic-addon1"
                                       placeholder='ex: Germany 1'
                                       value={this.state.name}
                                       onChange={event => this.setState({name: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Country Code</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="Country Code"
                                       placeholder='ex: DE'
                                       aria-describedby="basic-addon1"
                                       value={this.state.cc}
                                       onChange={event => this.setState({cc: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>IP</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="IP"
                                       placeholder='ex: 116.203.193.201'
                                       aria-describedby="basic-addon1"
                                       value={this.state.ip}
                                       onChange={event => this.setState({ip: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>SSL Port</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="SSL Port"
                                       placeholder='ex: 443'
                                       aria-describedby="basic-addon1"
                                       value={this.state.ssl_port}
                                       onChange={event => this.setState({ssl_port: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Proxy Port</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="Proxy Port"
                                       placeholder='ex: 80'
                                       aria-describedby="basic-addon1"
                                       value={this.state.proxy_port}
                                       onChange={event => this.setState({proxy_port: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>API Service Port</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="API Service Port"
                                       placeholder='ex: 720'
                                       aria-describedby="basic-addon1"
                                       value={this.state.api_server_port}
                                       onChange={event => this.setState({api_server_port: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Open Ports</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="Open Ports"
                                       placeholder='ex: 443,80,8080'
                                       aria-describedby="basic-addon1"
                                       value={this.state.open_ports}
                                       onChange={event => this.setState({open_ports: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Country Tags</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="Country Tags"
                                       placeholder='ex: BD,PAK'
                                       aria-describedby="basic-addon1"
                                       value={this.state.country_tags}
                                       onChange={event => this.setState({country_tags: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Network Tags</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="Network Tags"
                                       placeholder='ex: GP,AIRTEL'
                                       aria-describedby="basic-addon1"
                                       value={this.state.network_tags}
                                       onChange={event => this.setState({network_tags: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Note</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="VoIP"
                                       placeholder='VoIP'
                                       aria-describedby="basic-addon1"
                                       value={this.state.note}
                                       onChange={event => this.setState({note: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <button type='submit' className='ui button positive m-3'>
                                Update
                            </button>
                        </form>

                    </div>
                </article>
            </>
        )
    }
}

export default EditServerUi;
