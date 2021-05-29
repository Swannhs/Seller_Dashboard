import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Pagination} from "semantic-ui-react";

class CashSent extends Component {
    state = {
        cash: [],
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
        let cookie = new Cookies();
        RadiusApi.get('/balance-transactions/view.json', {
            params: {
                key: this.props.id,
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: cookie.get('Token'),
            }
        })
            .then(response => {
                this.setState({
                    cash: response.data.send,
                    total: response.data.send_total,
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
                {this.state.loading ? <div className="ui active centered inline loader mt-5"/> :
                    <>
                        {this.state.cash.length ?
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Trx ID</th>
                                    <th scope="col">Receiver</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Paid</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.cash.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.transaction}</td>
                                                <td>{item.user}</td>
                                                {item.status ? <td className='text-success'>Accepted</td> :
                                                    <td>Pending</td>}
                                                <td>{item.sent}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            : <h3 className='text-center text-danger'>There is no sent history</h3>}
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
        );
    }

}

export default CashSent;
