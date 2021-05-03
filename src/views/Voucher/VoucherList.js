import React, {Component} from 'react';
import 'reactjs-popup/dist/index.css';
import VoucherApi from "./VoucherApi";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import {Pagination} from "semantic-ui-react";
import VoucherApiMobile from "./VoucherApiMobile";
import {isMobile} from 'react-device-detect';

class VoucherList extends Component {
    state = {
        data: [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        refresh: true,
        loading: true
    }

    componentDidMount() {
        this.onApiCall();
    }

    onApiCall = () => {
        this.setState({loading: true})
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
                    data: response.data.items,
                    total: response.data.totalCount,
                    loading: false
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState.page !== this.state.page ? this.onApiCall() : null
    }

    /*

        //todo Live Screen Change detect
        componentDidMount() {
            window.addEventListener("resize", this.resize.bind(this));
            this.resize();
        }

        resize() {
            this.setState({hideNav: window.innerWidth <= 760});
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.resize.bind(this));
        }

     */

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
                <div className="ui grid">
                    <div className="ui text-right floated column">
                        <Link to='/admin/voucher/create'>
                            <button className='ui button primary'>
                                New
                            </button>
                        </Link>
                    </div>
                </div>
                {
                    this.state.loading ? <div className="ui active centered inline loader"/> :
                        <>
                            <table className="table table-striped">
                                {
                                    isMobile ? <VoucherApiMobile data={this.state.data}/>
                                        : <VoucherApi data={this.state.data}/>
                                }
                            </table>
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

export default VoucherList;
