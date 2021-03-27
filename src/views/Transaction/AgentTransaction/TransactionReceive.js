import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class TransactionReceive extends Component {

    state = {
        transactions: []
    }

    componentDidMount() {
        const cookie = new Cookies();
        RadiusApi.get('/voucher-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    transactions: response.data.received
                })
            })
    }

    render() {
        return (
            this.state.transactions.length ?
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Trx ID</th>
                        <th scope="col">Partner</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Group</th>
                        <th scope="col">Credit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.transactions.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.transaction}</td>
                                    <td>{item.user.username}</td>
                                    <td>{item.profile.name}</td>
                                    <td>{item.realm.name}</td>
                                    <td>{item.credit}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table> : <h3 className='text-center text-danger'>There is no received history</h3>
        );
    }
}

export default TransactionReceive;
