import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class CashReceived extends Component {
    state = {
        cash: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        const cookie = new Cookies();
        RadiusApi.get('/balance-transactions/view.json', {
            params: {
                token: cookie.get('Token'),
                key: this.props.id
            }
        })
            .then(response => {
                this.setState({
                    cash: response.data.received,
                    loading: false
                })
            })
    }

    render() {
        return (
            <>
                {this.state.loading ? <div className="ui active centered inline loader mt-5"/> :
                    <>
                        {this.state.cash.length ?
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Trx ID</th>
                                    <th scope="col">Sender</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Received</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.cash.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.transaction}</td>
                                                <td>{item.user.username}</td>
                                                {item.status ? <td className='text-success'>Accepted</td> :
                                                    <td>Pending</td>}
                                                <td>{item.received}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            : <h3 className='text-center text-danger'>There is no received history</h3>}
                    </>
                }
            </>
        );
    }
}

export default CashReceived;
