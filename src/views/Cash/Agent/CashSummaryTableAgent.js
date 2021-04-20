import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class CashSummaryTableAgent extends Component {
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
                        <th scope="col">Payable</th>
                        {/*<th scope="col">Paid</th>*/}
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
                                    <td>{item.payable}</td>
                                    <td>{item.receivable}</td>
                                    <td>{item.received}</td>
                                    <td>
                                        <Link to={'/admin/cash/transactions/' + item.id}>
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

export default CashSummaryTableAgent;
