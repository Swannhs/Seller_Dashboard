import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {AiFillEdit} from "react-icons/all";
import {Button} from "reactstrap";
import {Pagination} from "semantic-ui-react";

class Server extends Component {
    state = {
        server: [],
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
        let cookie = new Cookies
        RadiusApi.get('/servers/index.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    server: response.data.server,
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
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/root/server-new'>
                                    <button className='ui button primary'>
                                        New
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Type</th>
                                <th scope="col">Name</th>
                                <th scope="col">CC</th>
                                <th scope="col">IP</th>
                                <th scope="col">SSL Port</th>
                                <th scope="col">Proxy Port</th>
                                <th scope="col">API Service Port</th>
                                <th scope="col">Note</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.server ? this.state.server.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.type}</td>
                                            <td>{item.name}</td>
                                            <td>{item.cc}</td>
                                            <td>{item.ip}</td>
                                            <td>{item.ssl_port}</td>
                                            <td>{item.proxy_port}</td>
                                            <td>{item.api_server_port}</td>
                                            <td>{item.note}</td>
                                            <td>
                                                <Button className='btn-sm btn-primary'>
                                                    <Link to={'/admin/root/Server-edit/' + item.id}>
                                                        <AiFillEdit/>
                                                    </Link>
                                                </Button>

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

export default Server;
