import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import TransactionReceivedMobile from "./TransactionReceivedMobile";

class TransactionReceive extends Component {
    state = {
        transactions: [],
        mobile: false
    }

    componentDidMount() {
        this.setState({mobile: window.innerWidth <= 660})

        const cookie = new Cookies();

        RadiusApi.get('/voucher-transactions/view.json', {
            params: {
                token: cookie.get('Token'),
                key: this.props.id
            }
        })
            .then(response => {
                this.setState({
                    transactions: response.data.received
                })
            })

    }


    render() {
        return (
            <>
                {this.state.mobile ? <TransactionReceivedMobile data={this.state.transactions}/> :
                    <>
                        {this.state.transactions.length ?
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
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
                                                <td>{item.id}</td>
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
        );
    }

}

export default TransactionReceive;
