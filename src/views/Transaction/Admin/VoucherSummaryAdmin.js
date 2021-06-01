import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import {Pagination} from "semantic-ui-react";

class VoucherSummaryAdmin extends Component {
    state = {
        summary: [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
    }

    componentDidMount() {
        this.onApiCall();

    }

    onApiCall = () => {
        let cookie = new Cookies
        RadiusApi.get('/voucher-transactions/index.json', {
            params: {
                token: cookie.get('Token'),
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
            }
        })
            .then(response => {
                this.setState({
                    summary: response.data.item,
                    total: response.data.totalCount
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
                <div className='container'>
                    <div className='row'>
                        <div className='col-1'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/voucher/generate'>
                                    <button className='ui button positive'>
                                        Generate
                                    </button>
                                </Link>
                            </div>
                        </div>

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
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Debit</th>
                        <th scope='col'>Balance</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.summary ? this.state.summary.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.user.username}</td>
                                    <td>{item.realm.name}</td>
                                    <td>{item.profile.name}</td>
                                    <td>{item.credit}</td>
                                    <td>{item.debit}</td>
                                    <td>{item.balance}</td>
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

        );
    }
}

export default VoucherSummaryAdmin;
