import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";

class CashTable extends Component {
    state = {
        cash: []
    }

    componentDidMount() {
        const cookie = new Cookies();
        RadiusApi.get('/cash-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    cash: response.data.cash
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
                        <th scope="col">Partner</th>
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
                                    <td>{item.partner_user_id}</td>
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

export default CashTable;
