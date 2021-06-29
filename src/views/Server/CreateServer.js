import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";
import RadiusApi from "../../radius-api/RadiusApi";

class CreateServer extends Component {
    state = {
        type: '',
        name: '',
        cc: '',
        ip: '',
        sslPort: '',
        proxyPort: '',
        openPort: '',
        countryTag: '',
        networkTag: '',
        apiServerPort: '',
        note: ''
    }

    onCreateServer = event => {
        event.preventDefault();
        const data = this.state

        RadiusApi.post('/servers/add.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message)
                    this.props.history.push('/admin/root/server')
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

    onChangeHandle = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <>
                <div className='ml-3'>
                    <Link to='/admin/root/server'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>

                <article className="card-body mx-auto" style={{maxWidth: '650px', fontSize: '20px'}}>
                    <div className='pt-5'>
                        <form onSubmit={this.onCreateServer}>


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
                                <input type="text" className="form-control" aria-label="name"
                                       aria-describedby="basic-addon1"
                                       placeholder='DE 1'
                                    // value={this.state.name}
                                       name='name'
                                       onChange={() => this.onChangeHandle(event)}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>CC</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="CC"
                                       placeholder='DE'
                                       aria-describedby="basic-addon1"
                                       name='cc'
                                       onChange={event => this.setState({cc: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>IP</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="CC"
                                       placeholder='116.203.193.201'
                                       aria-describedby="basic-addon1"
                                       value={this.state.ip}
                                       onChange={event => this.setState({ip: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>SSL PORT</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="CC"
                                       placeholder='443'
                                       aria-describedby="basic-addon1"
                                       value={this.state.sslPort}
                                       onChange={event => this.setState({sslPort: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Proxy Port</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="proxy"
                                       placeholder='80'
                                       aria-describedby="basic-addon1"
                                       value={this.state.proxyPort}
                                       onChange={event => this.setState({proxyPort: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>API Server Port</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="apiServerPort"
                                       placeholder='720'
                                       aria-describedby="basic-addon1"
                                       value={this.state.apiServerPort}
                                       onChange={event => this.setState({apiServerPort: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Open Port</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="VoIP"
                                       placeholder='443'
                                       aria-describedby="basic-addon1"
                                       value={this.state.openPort}
                                       onChange={event => this.setState({openPort: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Country Tag</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="VoIP"
                                       placeholder='BD, PAK'
                                       aria-describedby="basic-addon1"
                                       value={this.state.countryTag}
                                       onChange={event => this.setState({countryTag: event.target.value})}
                                       required={true}
                                />
                            </div>

                            <h3 className='mt-3 pl-3 text-black-50'>Network Tag</h3>
                            <div className="input-group pl-3 w-50">
                                <input type="text" className="form-control" aria-label="VoIP"
                                       placeholder='GP, BNG'
                                       aria-describedby="basic-addon1"
                                       value={this.state.networkTag}
                                       onChange={event => this.setState({networkTag: event.target.value})}
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

                            <button type='submit' className='ui button primary m-3'>
                                Create
                            </button>


                        </form>

                    </div>
                </article>
            </>
        )
    }
}

export default CreateServer;
