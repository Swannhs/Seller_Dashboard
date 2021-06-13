import React, {Component} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Link} from "react-router-dom";
import UserApi from "./UserApi";
import UserApiMobile from "./UserApiMobile";
import Cookies from "universal-cookie";
import RadiusApi from "../../radius-api/RadiusApi";
import {isMobile} from "react-device-detect";
import {Pagination} from "semantic-ui-react";


class UserList extends Component {

    state = {
        data: [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        refresh: true,
        loading: true,
        role: ''
    }

    componentDidMount() {
        this.onApiCall();
    }

    onRefresh = () => {
        this.onApiCall();
    }

    onApiCall = () => {
        this.setState({loading: true})
        RadiusApi.get('/access-providers/index-tree-grid.json', {
            params: {
                //Assign limit of row showing in table
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                node: 0,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                    this.setState({
                        data: response.data.items,
                        total: response.data.totalCount,
                        loading: false,
                    })
                }
            )
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
        await this.setState({
            page: data.activePage,
            start: (data.activePage - 1) * this.state.limit
        })
    }


    render() {
        return (
            <>
                {/* ---------------- New Button Start ----------------*/}
                <div className="ui grid">
                    <div className='four column row'>
                        {
                            isMobile ?
                                <div className="text-right right floated column">
                                    <Link to='/admin/users/create'>
                                        <button className='ui button primary small'>
                                            New
                                        </button>
                                    </Link>
                                </div> :
                                <div className="text-right right floated column">
                                    <Link to='/admin/users/create'>
                                        <button className='ui button primary'>
                                            New
                                        </button>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>

                {/* ---------------- New Button End ----------------*/}
                {
                    this.state.loading ? <div className="ui active centered inline loader"/> :
                        <>
                            <table className="table table-striped">
                                {/*-----------------Calling User List Api---------------------*/}
                                {
                                    isMobile ? <UserApiMobile data={this.state.data} refresh={this.onRefresh}/> :
                                        <UserApi data={this.state.data} refresh={this.onRefresh}/>
                                }
                                {/*-----------------Calling User List Api---------------------*/}
                            </table>
                            <div className='ui grid'>
                                <div className='twelve wide column'>
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

                                <div className='two wide column'>
                                    <div className='left floated five wide column'>
                                        <h3 className='ml-3'>Total:{this.state.total}</h3>
                                    </div>
                                </div>
                            </div>


                        </>
                }
            </>
        );
    }

}

export default UserList;
