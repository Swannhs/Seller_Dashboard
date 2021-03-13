import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class TransactionSent extends Component {
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
                        transactions: response.data.sent
                    })
                })
        }
    }

    render() {
        return (
            <>
                <div className="ui grid">
                    <div className="ui text-right floated column">
                        <Link to='/admin/transfer'>
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
                        <th scope="col">Profile</th>
                        <th scope="col">credit</th>
                        <th scope="col">Debit</th>
                        <th scope="col">Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.transactions ? this.state.transactions.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.partner_user_id}</td>
                                    <td>{item.profile_id}</td>
                                    <td>{item.credit}</td>
                                    <td>{item.debit}</td>
                                    <td>{item.balance}</td>
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

export default TransactionSent;
