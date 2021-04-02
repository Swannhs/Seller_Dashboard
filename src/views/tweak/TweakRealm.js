import React, {Component} from 'react';
import {Link} from "react-router-dom";

class TweakRealm extends Component {
    state = {

    }

    render() {
        return (
            <div className='container'>
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
                                </tr>
                            )
                        }) : null
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TweakRealm;
