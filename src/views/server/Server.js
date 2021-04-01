import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Server extends Component {
    state = {
        root: ''
    }

    render() {
        return (
            <div>
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
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.transactions ? this.state.transactions.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.transaction}</td>
                                    <td>{item.user.username}</td>
                                    <td>{item.profile.name}</td>
                                    <td>{item.realm.name}</td>
                                    <td>{item.credit}</td>
                                    <td>{item.debit}</td>
                                    <td>{item.balance}</td>
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

export default Server;
