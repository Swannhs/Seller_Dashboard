import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie/lib";

class TransactionAdmin extends Component {

    state = {
        root: true,
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
                    root: response.data.data.isRootUser
                })
            })

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
                {this.state.root ?
                    <>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-1'>
                                    <div className="ui text-right floated column">
                                        <Link to='/admin/voucher/generate'>
                                            <button className='ui button positive'>
                                                Generate
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className='col'>
                                    <div className="ui text-right floated column">
                                        <Link to='/admin/voucher/transfer'>
                                            <button className='ui button primary'>
                                                Transfer
                                            </button>
                                        </Link>
                                    </div>
                                </div>
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
                                            <td>{item.partner_username}</td>
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
                    </> : <h1 className='text-center text-danger'>You are not root user</h1>
                }

            </>

        );
    }
}

export default TransactionAdmin;
