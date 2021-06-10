import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import TransactionReceivedMobile from "./TransactionReceivedMobile";
import {Pagination} from "semantic-ui-react";
import {isMobile} from "react-device-detect";

class TransactionReceive extends Component {
    state = {
        transactions: [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        loading: true,
    }

    componentDidMount() {
        this.onApiCall();
    }

    onApiCall = () => {
        RadiusApi.get('/voucher-transactions/view.json', {
            params: {
                token: localStorage.getItem('Token'),
                key: this.props.id,
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
            }
        })
            .then(response => {
                this.setState({
                    transactions: response.data.received,
                    loading: false,
                    total: response.data.received_total
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState.page !== this.state.page ? this.onApiCall() : null
    }

    onPagination() {
        let totalPage = this.state.total / this.state.limit
        return Math.ceil(totalPage)
    }

    async onPageChaneHandler(event, data) {
        await this.setState({
            page: data.activePage,
            start: (data.activePage - 1) * this.state.limit
        })
    }

    onChangeHandle = () => {
        this.setState({
            search: event.target.value
        })
    }

    onResetPagination() {
        this.setState({
            page: 1,
            start: 0,
            limit: 10,
            total: 0
        })
    }

    render() {
        return (
            <>
                {
                    this.state.loading ? <div className="ui active centered inline loader mt-5"/> :
                        <>
                            {
                                isMobile ? <TransactionReceivedMobile data={this.state.transactions}/> :
                                    <>
                                        {this.state.transactions.length ?
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Trx ID</th>
                                                    <th scope="col">Partner</th>
                                                    <th scope="col">Plan</th>
                                                    <th scope="col">Vendor</th>
                                                    <th scope="col">Credit</th>
                                                    <th scope="col">Debit</th>
                                                    {/*<th scope="col">Cost</th>*/}
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
                                                                {/*<td>{item.balance}$</td>*/}
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
                            {/*--------------------Pagination------------------------*/}
                            <tfoot>
                            <tr>
                                <th colSpan={5}>
                                    <div className="ui right floated pagination menu align-content-lg-end">
                                        <Pagination
                                            defaultActivePage={this.state.page}
                                            firstItem={null}
                                            lastItem={null}
                                            pointing
                                            secondary
                                            totalPages={this.onPagination()}
                                            onPageChange={async (event, data) =>
                                                this.onPageChaneHandler(event, data)
                                            }
                                        />
                                    </div>
                                </th>
                            </tr>
                            </tfoot>
                        </>
                }
            </>
        );
    }

}

export default TransactionReceive;
