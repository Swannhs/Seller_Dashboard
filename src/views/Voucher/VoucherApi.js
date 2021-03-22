import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Cookies from "universal-cookie/lib";
import {Pagination} from "semantic-ui-react";
import {AiOutlineEye, BiReset} from "react-icons/all";


class VoucherApi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            page: 1,
            start: 0,
            limit: 13,
            total: 0
        }
    }

    onApiCall = () => {
        const cookie = new Cookies
        RadiusApi.get('/vouchers/index.json', {
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


    componentDidMount() {
        this.onApiCall()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState.page !== this.state.page ? this.onApiCall() : null
    }


    onPagination() {
        let totalPage = this.state.total / this.state.limit
        return Math.trunc(totalPage) + parseInt((totalPage % 1).toFixed())
    }


    render() {
        return (
            <>
                <tbody>
                {(this.state.userData) ? this.state.userData.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.realm}</td>
                            <td>{item.profile}</td>
                            {/*<td>{item.active ? <span>Active</span> : <span>Inactive</span>}</td>*/}
                            <td data-label="Action">
                                <BiReset/>
                                <AiOutlineEye/>
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
                        <div className="ui right floated pagination menu">
                            <Pagination
                                defaultActivePage={1}
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary
                                totalPages={this.onPagination()}
                                onPageChange={(event, data) => {
                                    this.setState({
                                        page: data.activePage,
                                        start: this.state.page * this.state.limit
                                    })
                                }}
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
