import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";

class TransactionSent extends Component {
    state = {
        transactions: []
    }

    componentDidMount() {
        const cookie = new Cookies();
        RadiusApi.get('/voucher-transaction-details/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    transactions: response.data.sent
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
                    <th scope="col">Debit</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.transactions ? this.state.transactions.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.partner_username}</td>
                                <td>{item.debit}</td>
                            </tr>
                        )
                    }) : null
                }
                </tbody>
            </table>

        );
    }
}

export default TransactionSent;
