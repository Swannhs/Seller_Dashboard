import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TransactionSummaryApi from "./TransactionSummaryApi";
import TransactionSummaryApiMobile from "./TransactionSummaryApiMobile";
import RadiusApi from "../../../radius-api/RadiusApi";
import {isMobile} from "react-device-detect";
import {Pagination} from "semantic-ui-react";

class TransactionSummaryTable extends Component {
    state = {
        data: [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        loading: true,
        root: ''
    }

    componentDidMount() {
        this.setState({
            root: localStorage.getItem('Role')
        })
        this.onApiCall();
    }

    onApiCall = () => {
        RadiusApi.get('/voucher-transactions/index.json', {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    data: response.data.item,
                    total: response.data.totalCount,
                    loading: false
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
                    this.state.loading ? <div className="ui active centered inline loader"/> :
                        <>
                            <div className='row'>
                                {
                                    this.state.root !== 'admin' ?
                                        <div className='col'>
                                            <div className="ui text-right floated column">
                                                <Link to='/admin/voucher/refund'>
                                                    <button className='ui button green'>
                                                        Refund
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        : <></>
                                }


                                <div className='col'>
                                    <div className="ui text-right floated column">
                                        <Link to='/admin/voucher/transfer'>
                                            <button className='ui button primary'>
                                                Transfer
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped">

                                {/*    -------------------------Table Api goes here------------------------------*/}
                                {
                                    isMobile ? <TransactionSummaryApiMobile data={this.state.data}/> :
                                        <TransactionSummaryApi data={this.state.data}/>
                                }
                                {/*    -------------------------Table Api goes here------------------------------*/}
                            </table>
                            {
                                this.state.total > 10 ?
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
                                    </tfoot> : <></>
                            }

                        </>
                }
            </>
        );
    }

}

export default TransactionSummaryTable;
