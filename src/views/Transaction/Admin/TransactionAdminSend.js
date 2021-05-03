import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class TransactionAdminSend extends Component {

    state = {
        root: true,
        transactions: []
    }


    onGetData = () => {
        const cookie = new Cookies();

        RadiusApi.get('/voucher-transactions/view.json', {
            params: {
                token: cookie.get('Token'),
                key: this.props.id
            }
        })
            .then(response => {
                this.setState({
                    transactions: response.data.send
                })
            })
    }

    componentDidMount() {
        const cookie = new Cookies();

        RadiusApi.get('/Dashboard/check_token.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    root: response.data.data.isRootUser
                })
                if (response.data.data.isRootUser) {
                    this.onGetData();
                }
            })
    }


    render() {
        return (
            <>
                {this.state.root ?
                    <>
                        {
                            this.state.transactions.length ?
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
                                                    <td>{item.balance}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table> : <h3 className='text-center text-danger'>No send history yet</h3>
                        }
                    </>
                    : <h3 className='text-center text-danger'>You are not allowed here</h3>
                }
            </>
        );
    }

}

export default TransactionAdminSend;
