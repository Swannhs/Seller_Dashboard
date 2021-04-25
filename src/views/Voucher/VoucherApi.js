import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Cookies from "universal-cookie/lib";
import {Pagination} from "semantic-ui-react";
import {BiReset} from "react-icons/all";


class VoucherApi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            page: 1,
            start: 0,
            limit: 10,
            total: 0,
            refresh: true,
        }
        this.onApiCall();
    }


    onApiCall = () => {
        const cookie = new Cookies
        RadiusApi.get('/vouchers/index-user-vouchers.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    userData: response.data.items,
                    total: response.data.totalCount
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState.page !== this.state.page ? this.onApiCall() : null
    }


    onVoucherReset = (props) => {
        let reset = {
            reset: props
        }

        let cookie = new Cookies
        RadiusApi.post('/vouchers/voucher-reset.json', reset, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                    if (response.data.success) {
                        alert('Voucher reset successful')
                    } else {
                        alert(response.data.message)
                    }
                }
            )
        this.forceUpdate();
    }


    onPagination() {
        let totalPage = this.state.total / this.state.limit
        return Math.trunc(totalPage) + parseInt((totalPage % 1).toFixed())
    }

    async onPageChaneHandler(event, data) {
        await this.setState({
            page: data.activePage,
            start: (data.activePage - 1) * this.state.limit
        })
    }


    render() {
        return (
            <>
                <tbody>
                {(this.state.userData) ? this.state.userData.map((item) => {
                    return (
                        <tr key={item.id}>

                            {/*{this.props.mobile?<td>*/}
                            {/*    <AiOutlinePlusCircle/>*/}
                            {/*</td>:null}*/}

                            <td>{item.name}</td>
                            <td>{item.password}</td>

                            <td>{item.realm}</td>
                            <td>{item.profile}</td>
                            {/*<td>{item.active ? <span>Active</span> : <span>Inactive</span>}</td>*/}
                            <td data-label="Action">
                                <BiReset aria-placeholder='reset' onClick={() => this.onVoucherReset(item.id)}/>
                            </td>
                        </tr>
                    )
                }) : null
                }
                </tbody>


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

export default VoucherApi;
