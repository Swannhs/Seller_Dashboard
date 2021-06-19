import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import {Pagination} from "semantic-ui-react";
import {ToastContainer} from "react-toastify";

class VoucherSummaryAdmin extends Component {
    state = {
        summary: [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        loading: true
    }

    componentDidMount() {
        this.onApiCall();
    }

    onApiCall = () => {
        this.setState({loading: true})
        RadiusApi.get('/voucher-transactions/index.json', {
            params: {
                token: localStorage.getItem('Token'),
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
            }
        })
            .then(response => {
                this.setState({
                    summary: response.data.item,
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
                <ToastContainer/>
                <div className='ui grid'>
                    <div className="left floated column">
                        <Link to='/admin/voucher/generate'>
                            <button className='ui button positive'>
                                Generate
                            </button>
                        </Link>
                    </div>

                        <div className="ui two column">
                            <Link to='/admin/voucher/refund'>
                                <button className='ui button red'>
                                    Refund
                                </button>
                            </Link>
                        </div>

                    <div className="right floated column mr-5">
                        <Link to='/admin/voucher/transfer'>
                            <button className='ui button primary'>
                                Transfer
                            </button>
                        </Link>
                    </div>
                </div>
                {
                    this.state.loading ? <div className="mt-5 ui active centered inline loader"/> :
                        <>
                            <table className="table table-striped text-center mt-3">
                                <tr className='ct-grid-background border-primary'>
                                    <th className='text-center'>Receiver</th>
                                    <th className='text-center'>Vendor</th>
                                    <th className='text-center'>Plan</th>
                                    <th className='text-center'>Credit</th>
                                    <th className='text-center'>Debit</th>
                                    <th className='text-center'>Available</th>
                                    <th>Action</th>
                                </tr>
                                <tbody>
                                {
                                    this.state.summary ? this.state.summary.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td className='text-center'>{item.user.username}</td>
                                                <td className='text-center'>{item.realm.name}</td>
                                                <td className='text-center'>{item.profile.name}</td>
                                                <td className='text-center'>{item.credit}</td>
                                                <td className='text-center'>{item.debit}</td>
                                                <td className='text-center'>{item.balance}</td>
                                                <td>
                                                    <Link to={'/admin/root/voucher/transactions/' + item.id}>
                                                        Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    }) : <h3 className='text-danger'>No record available</h3>
                                }
                                </tbody>
                            </table>
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

export default VoucherSummaryAdmin;
