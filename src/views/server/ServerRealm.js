import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {Link} from "react-router-dom";
import DeleteServerRealm from "./DeleteServerRealm";

class ServerRealm extends Component {
    state = {
        server_realm: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/server-realms/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    server_realm: response.data.serverRealms
                })
            })
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className='col'>
                        <div className="ui text-right floated column">
                            <Link to='/admin/root/server-realms/new'>
                                <button className='ui button primary'>
                                    New
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Server</th>
                        <th scope="col">Realms</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.server_realm ? this.state.server_realm.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.server.name}</td>
                                    <td>{item.realm.name}</td>
                                    <td><DeleteServerRealm delId={item.id}/></td>
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

export default ServerRealm;
