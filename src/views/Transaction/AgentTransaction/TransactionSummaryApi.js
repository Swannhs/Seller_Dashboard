import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";

class TransactionSummaryApi extends Component {
    state = {
        summary: [],
        role: '',
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/voucher-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    summary: response.data.item,
                    role: cookie.get('Role')
                })
            })
    }

    render() {
        return (
            <tbody>
            {
                this.state.summary ? this.state.summary.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.profile.name}</td>
                            <td>{item.balance}</td>
                            <td>{item.realm.name}</td>
                            <td>{item.credit}</td>
                            <td>{item.debit}</td>

                            <td>
                                <Link to={'/admin/voucher/transactions/' + item.id}>
                                    Details
                                </Link>
                            </td>
                        </tr>
                    )
                }) : <h3 className='text-danger'>No record available</h3>
            }
            </tbody>
        );
    }
}

export default TransactionSummaryApi;
