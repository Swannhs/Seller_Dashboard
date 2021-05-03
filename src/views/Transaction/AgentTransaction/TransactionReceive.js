import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import TransactionReceivedMobile from "./TransactionReceivedMobile";

class TransactionReceive extends Component {
    state = {
        transactions: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        const cookie = new Cookies();

        RadiusApi.get('/voucher-transactions/view.json', {
            params: {
                token: cookie.get('Token'),
                key: this.props.id
            }
        })
            .then(response => {
                this.setState({
                    transactions: response.data.received,
                    loading: false
                })
            })
    }


    render() {
        return (
            <>
                {
                    this.state.loading ? <div className="ui active centered inline loader mt-5"/> :
                        <>
                            {this.state.mobile ? <TransactionReceivedMobile data={this.state.transactions}/> :
                                <>
                                    {this.state.transactions.length ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th scope="col">Trx ID</th>
                                                <th scope="col">Partner</th>
                                                <th scope="col">Profile</th>
                                                <th scope="col">Group</th>
                                                <th scope="col">credit</th>
                                                <th scope="col">Debit</th>
                                                <th scope="col">Cost</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.transactions.map((item) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{item.transaction}</td>
                                                            <td>{item.user.username}</td>
                                                            <td>{item.profile.name}</td>
                                                            <td>{item.realm.name}</td>
                                                            <td>{item.credit}</td>
                                                            <td>{item.debit}</td>
                                                            <td>{item.balance}$</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                        : <h3 className='text-center text-danger'>No Received history yet</h3>
                                    }
                                </>
                            }
                        </>
                }
            </>
        );
    }

}

export default TransactionReceive;
