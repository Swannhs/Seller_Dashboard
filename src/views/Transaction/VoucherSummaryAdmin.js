import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";

class VoucherSummaryAdmin extends Component {
    state = {
        summary: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/voucher-transactions/summary.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    summary: response.data.item
                })
            })
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Realm</th>
                    <th scope="col">Profile</th>
                    <th scope="col">Credit</th>
                    <th scope="col">Debit</th>
                    <th scope='col'>Balance</th>
                    <th scope='col'>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.summary.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.user.username}</td>
                                <td>{item.realm.name}</td>
                                <td>{item.profile.name}</td>
                                <td>{item.credit}</td>
                                <td>{item.debit}</td>
                                <td>{item.balance}</td>
                                <td>Details</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        );
    }
}

export default VoucherSummaryAdmin;
