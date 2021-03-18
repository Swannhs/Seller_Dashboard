import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class TransactionTable extends Component {
    state = {
        id: '',
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
                    transactions: response.data.transactions
                })
            })
    }


    render() {
        return (
            <>
                <div className="ui grid">
                    <div className="ui text-right floated column">
                        <Link to='/admin/voucher/transfer'>
                            <button className='ui button primary'>
                                Transfer
                            </button>
                        </Link>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Trx ID</th>
                        <th scope="col">Partner</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Credit</th>
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
                                    <td>{item.balance}</td>
                                    <td>{item.credit}</td>
                                    <td>{item.debit}</td>
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

export default TransactionTable;
