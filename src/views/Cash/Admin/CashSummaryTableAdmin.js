import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {Link} from "react-router-dom";

class CashSummaryAgent extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/balance-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    items: response.data.item
                })
            })
    }

    render() {
        return (
            <>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Payable</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Receivable</th>
                        <th scope="col">Received</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items ? this.state.items.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.user.username}</td>
                                    <td>{item.payable}</td>
                                    <td>{item.paid}</td>
                                    <td>{item.receivable}</td>
                                    <td>{item.received}</td>
                                    <td>
                                        <Link to={'/admin/root/cash/transactions/' + item.id}>
                                            Details
                                        </Link>
                                    </td>
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

export default CashSummaryAgent;
