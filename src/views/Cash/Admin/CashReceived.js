import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class CashReceived extends Component {
    state = {
        cash: []
    }

    componentDidMount() {
        const cookie = new Cookies();
        RadiusApi.get('/balance-transactions/view.json', {
            params: {
                token: cookie.get('Token'),
                key: this.props.id
            }
        })
            .then(response => {
                this.setState({
                    cash: response.data.received
                })
            })
    }

    render() {
        return (
            <>
                {this.state.cash.length ?
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Trx ID</th>
                            <th scope="col">Receiver</th>
                            <th scope="col">Payable</th>
                            <th scope="col">Receivable</th>
                            <th scope="col">Status</th>
                            <th scope="col">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.cash.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.transaction}</td>
                                        <td>{item.user.username}</td>
                                        <td>{item.payable}</td>
                                        <td>{item.receivable}</td>
                                        {item.status ? <td>Accepted</td> : <td>Pending</td>}
                                        <td>{item.received}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    : <h3 className='text-center text-danger'>There is no received history</h3>}
            </>
        );
    }
}

export default CashReceived;
