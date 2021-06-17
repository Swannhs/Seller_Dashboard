import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import {Pagination} from "semantic-ui-react";

class CashSummaryAgent extends Component {
    state = {
        items: [],
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
        RadiusApi.get('/balance-transactions/index.json', {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    items: response.data.item,
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
                    this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">User Name</th>
                                <th scope="col">Payable</th>
                                <th scope="col">Paid</th>
                                <th scope="col">Receivable</th>
                                <th scope="col">Received</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.items ? this.state.items.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.user}</td>
                                            <td>{item.payable}</td>
                                            <td>{item.paid}</td>
                                            <td>{item.receivable}</td>
                                            <td>{item.received}</td>
                                            <td>
                                                <Link to={'/admin/root/cash/transactions/' + item.id}>
                                                    Details
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }) : null
                            }
                            </tbody>
                        </table>
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
        );
    }

}

export default CashSummaryAgent;
