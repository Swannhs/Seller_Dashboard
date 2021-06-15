import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import DeleteServerRealm from "./DeleteServerRealm";
import {Pagination} from "semantic-ui-react";

class ServerRealm extends Component {
    state = {
        server_realm: [],
        page: 1,
        start: 0,
        limit: 20,
        total: 0,
        loading: true,
    }

    componentDidMount() {
        this.onApiCall();
    }

    onApiCall = () => {
        RadiusApi.get('/server-realms/index.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    server_realm: response.data.serverRealms,
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
                <div className='row'>
                    <div className='col'>
                        <div className="ui text-right floated column">
                            <Link to='/admin/root/server-realms/new'>
                                <button className='ui button primary'>
                                    New
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {
                    this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Server</th>
                                <th scope="col">Realms</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.server_realm ? this.state.server_realm.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.server.name}</td>
                                            <td>{item.realm.name}</td>
                                            <td><DeleteServerRealm delId={item.id}/></td>
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

export default ServerRealm;
