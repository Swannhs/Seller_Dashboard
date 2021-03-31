import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class CashTableAgent extends Component {
    state = {
        cash: []
    }
    componentDidMount() {
        const cookie = new Cookies();
        RadiusApi.get('/balance-transaction-details/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    cash: response.data.items
                })
            })
    }

    render() {
        return (
            <>
                <div className="ui grid">
                    <div className="ui text-right floated column">
                        <Link to='/admin/cash/transfer'>
                            <button className='ui button primary'>
                                Pay
                            </button>
                        </Link>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Trx ID</th>
                        <th scope="col">Sender</th>
                        <th scope="col">Receiver</th>
                        <th scope="col">Payable</th>
                        <th scope="col">Receivable</th>
                        <th scope="col">Status</th>
                        <th scope="col">Received</th>
                        <th scope="col">Reference</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.cash ? this.state.cash.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.sender_user_id}</td>
                                    <td>{item.user.username}</td>
                                    <td>{item.payable}</td>
                                    <td>{item.receivable}</td>
                                    {item.status ? <td>Accepted</td> : <td>Pending</td>}
                                    <td>{item.received}</td>
                                    <td>{item.reference}</td>
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

export default CashTableAgent;
