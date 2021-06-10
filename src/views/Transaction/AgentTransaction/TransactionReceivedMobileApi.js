import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import TransactionReceivedMobile from "./TransactionReceivedMobile";
import {Pagination} from "semantic-ui-react";

class TransactionReceivedMobileApi extends Component {
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
                    total: response.data.received_total,
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
                                this.state.transactions[0] ?
                                    <TransactionReceivedMobile data={this.state.transactions}/> :
                                    <h3 className='text-danger text-center'>No received history is found</h3>
                            }

                        </>
                }
                <div className='mt-2'>
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
                </div>
            </>
        );
    }
}

export default TransactionReceivedMobileApi;
