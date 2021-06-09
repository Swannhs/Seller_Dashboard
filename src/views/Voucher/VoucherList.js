import React, {Component} from 'react';
import 'reactjs-popup/dist/index.css';
import VoucherApi from "./VoucherApi";
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import {Pagination} from "semantic-ui-react";
import VoucherApiMobile from "./VoucherApiMobile";
import {isMobile} from 'react-device-detect';
import {Dropdown, DropdownButton} from "react-bootstrap";
import VoucherFilter from "../../components/Filter/VoucherFilter";

class VoucherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            start: 0,
            limit: 10,
            total: 0,
            refresh: true,
            loading: true,
            search: null,
        }
        this.onChangeHandle = this.onChangeHandle.bind(this)
        this.onSearchApiCall = this.onSearchApiCall.bind(this)
    }


    componentDidMount() {
        this.onApiCall();
    }

    onApiCall = () => {
        this.setState({loading: true})
        RadiusApi.get('/vouchers/index.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: localStorage.getItem('Token')
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

    onSearchApiCall = () => {
        event.preventDefault();
        this.setState({loading: true})
        this.onResetPagination()
        RadiusApi.get('/vouchers/index.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                query: this.state.search,
                token: localStorage.getItem('Token')
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

    onFilterApiCall = event => {
        event.preventDefault();
        if (event.target.value !== 'all') {
            this.setState({loading: true})
            this.onResetPagination();
            RadiusApi.get('/vouchers/index.json', {
                params: {
                    page: this.state.page,
                    start: this.state.start,
                    limit: this.state.limit,
                    filter: `[{"operator": "in","value": ["${event.target.value}"],"property": "status"}]`,
                    token: localStorage.getItem('Token')
                }
            })
                .then(response => {
                    this.setState({
                        data: response.data.items,
                        total: response.data.totalCount,
                        loading: false
                    })
                })
        } else {
            this.onApiCall();
        }
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
        return Math.ceil(totalPage)
    }

    async onPageChaneHandler(event, data) {
        this.setState({loading: true})
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
                <div className="group-item">
                    <div className="ui grid">
                        {
                            isMobile ?
                                <>
                                    <div className="seven wide column">
                                        <form onSubmit={this.onSearchApiCall}>
                                            <div className="ui icon input" style={{width: '140px'}}>
                                                <input type="text" placeholder="Search Name"
                                                       onChange={this.onChangeHandle}
                                                />
                                                <i className="circular search link icon"
                                                   onClick={this.onSearchApiCall}
                                                />
                                            </div>
                                        </form>
                                    </div>

                                    <div className='two wide column'>
                                        <VoucherFilter/>

                                    </div>

                                </>
                                :
                                <>
                                    <div className="five wide column">
                                        <form onSubmit={this.onSearchApiCall}>
                                            <div className="ui icon input">
                                                <input type="text" placeholder="Search Name"
                                                       onChange={this.onChangeHandle}
                                                />
                                                <i className="circular search link icon"
                                                   onClick={this.onSearchApiCall}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='two wide column'>
                                        {/*<VoucherFilter/>*/}

                                        <div className="form-group input-group">
                                            {/*<div className="input-group-prepend">*/}
                                            {/*    <span className="input-group-text"> <i className="fab fa-cloudscale"/> </span>*/}
                                            {/*</div>*/}
                                            <select className="form-control text-capitalize"
                                                    onChange={event => this.onFilterApiCall(event)}>
                                                <option value='all'>All</option>
                                                <option key={1} value='new'>New</option>
                                                <option key={2} value='used'>Used</option>
                                                <option key={3} value='depleted'>Depleted</option>
                                                <option key={4} value='expired'>Expired</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                        }

                        {
                            isMobile ?
                                <div className="six wide column right aligned">
                                    <Link to='/admin/voucher/create'>
                                        <button className='ui button primary small'>
                                            New
                                        </button>
                                    </Link>
                                </div> :
                                <div className="eight wide column right aligned">
                                    <Link to='/admin/voucher/create'>
                                        <button className='ui button primary'>
                                            New
                                        </button>
                                    </Link>
                                </div>
                        }

                    </div>
                </div>


                {
                    this.state.loading ? <div className="mt-5 ui active centered inline loader"/> :
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
