import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class CreateServer extends Component {
    state = {
        type: '',
        name: '',
        cc: '',
        ip: '',
        sslPort: '',
        proxyPort: '',
        apiServerPort: '',
        note: ''
    }

    onCreateServer = () => {
        let data = this.state
        let cookie = new Cookies
        RadiusApi.post('/servers/add.json', data, {
            params: {
                token: cookie.get('Token')
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
                        <h3 className='mt-3 pl-3 text-black-50'>Type</h3>
                        <div className="input-group pl-3 w-50">
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                value={this.state.type}
                                onChange={event => {
                                    this.setState({
                                        type: event.target.value
                                    })
                                }}
                            >
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
                                   value={this.state.name}
                                   onChange={event => this.setState({name: event.target.value})}
                            />
                        </div>

                        <h3 className='mt-3 pl-3 text-black-50'>CC</h3>
                        <div className="input-group pl-3 w-50">
                            <input type="text" className="form-control" aria-label="CC"
                                   placeholder='DE'
                                   aria-describedby="basic-addon1"
                                   value={this.state.cc}
                                   onChange={event => this.setState({cc: event.target.value})}
                            />
                        </div>

                        <h3 className='mt-3 pl-3 text-black-50'>IP</h3>
                        <div className="input-group pl-3 w-50">
                            <input type="text" className="form-control" aria-label="CC"
                                   placeholder='116.203.193.201'
                                   aria-describedby="basic-addon1"
                                   value={this.state.ip}
                                   onChange={event => this.setState({ip: event.target.value})}
                            />
                        </div>

                        <h3 className='mt-3 pl-3 text-black-50'>SSL PORT</h3>
                        <div className="input-group pl-3 w-50">
                            <input type="text" className="form-control" aria-label="CC"
                                   placeholder='443'
                                   aria-describedby="basic-addon1"
                                   value={this.state.sslPort}
                                   onChange={event => this.setState({sslPort: event.target.value})}
                            />
                        </div>

                        <h3 className='mt-3 pl-3 text-black-50'>Proxy Port</h3>
                        <div className="input-group pl-3 w-50">
                            <input type="text" className="form-control" aria-label="proxy"
                                   placeholder='80'
                                   aria-describedby="basic-addon1"
                                   value={this.state.proxyPort}
                                   onChange={event => this.setState({proxyPort: event.target.value})}
                            />
                        </div>

                        <h3 className='mt-3 pl-3 text-black-50'>API Server Port</h3>
                        <div className="input-group pl-3 w-50">
                            <input type="text" className="form-control" aria-label="apiServerPort"
                                   placeholder='720'
                                   aria-describedby="basic-addon1"
                                   value={this.state.apiServerPort}
                                   onChange={event => this.setState({apiServerPort: event.target.value})}
                            />
                        </div>

                        <h3 className='mt-3 pl-3 text-black-50'>Note</h3>
                        <div className="input-group pl-3 w-50">
                            <input type="text" className="form-control" aria-label="VoIP"
                                   placeholder='VoIP'
                                   aria-describedby="basic-addon1"
                                   value={this.state.note}
                                   onChange={event => this.setState({note: event.target.value})}
                            />
                        </div>


                        <button onClick={this.onCreateServer} className='ui button primary m-3'>
                            Create
                        </button>
                    </div>
                </article>
            </>
        )
    }
}

export default CreateServer;
