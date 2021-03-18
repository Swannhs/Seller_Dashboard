import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class TransactionReceive extends Component {

    state = {
        id: '',
        transactions: []
    }

    componentDidMount() {
        const cookie = new Cookies();

        RadiusApi.get('/dashboard/check_token.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    id: response.data.data.user.id
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.id !== this.state.id) {


            RadiusApi.get('/voucher-transactions/index.json', {
                params: {
                    id: this.state.id
                }
            })
                .then(response => {
                    this.setState({
                        transactions: response.data.received
                    })
                })
        }
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
                        <th scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.transactions ? this.state.transactions.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.partner_user_id}</td>
                                    <td className='text-success'>{item.debit}</td>
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

export default TransactionReceive;