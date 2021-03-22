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
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Trx ID</th>
                    <th scope="col">Partner</th>
                    <th scope="col">Credit</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.transactions ? this.state.transactions.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.partner_username}</td>
                                <td>{item.credit}</td>
                            </tr>
                        )
                    }) : null
                }
                </tbody>
            </table>
        );
    }
}

export default TransactionReceive;
