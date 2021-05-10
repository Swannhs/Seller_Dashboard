import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {AiFillEdit} from "react-icons/all";
import {Button} from "reactstrap";

class Server extends Component {
    state = {
        root: '',
        server: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/servers/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    server: response.data.server
                })
            })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/root/server-new'>
                                    <button className='ui button primary'>
                                        New
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Name</th>
                        <th scope="col">CC</th>
                        <th scope="col">IP</th>
                        <th scope="col">SSL Port</th>
                        <th scope="col">Proxy Port</th>
                        <th scope="col">API Service Port</th>
                        <th scope="col">Note</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.server ? this.state.server.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.type}</td>
                                    <td>{item.name}</td>
                                    <td>{item.cc}</td>
                                    <td>{item.ip}</td>
                                    <td>{item.ssl_port}</td>
                                    <td>{item.proxy_port}</td>
                                    <td>{item.api_server_port}</td>
                                    <td>{item.note}</td>
                                    <td>
                                        <Button className='btn-sm btn-primary'>
                                            <Link to={'/admin/root/Server-edit/' + item.id}>
                                                <AiFillEdit/>
                                            </Link>
                                        </Button>

                                    </td>
                                </tr>
                            )
                        }) : null
                    }
                    </tbody>
                </table>
            </>
        );
    }
}

export default Server;
