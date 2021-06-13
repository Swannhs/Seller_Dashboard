import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import DeleteTweakRealms from "./DeleteTweakRealms";
import {Pagination} from "semantic-ui-react";

class TweakRealm extends Component {
    state = {
        tweakRealms: [],
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
        RadiusApi.get('/Tweak-realms/index.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    tweakRealms: response.data.tweakRealms,
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
                                <Link to='/admin/root/tweak-realm/new'>
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
                                <th scope="col">Tweaks</th>
                                <th scope="col">Realms</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.tweakRealms ? this.state.tweakRealms.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.tweak.name}</td>
                                            <td>{item.realm.name}</td>
                                            <td><DeleteTweakRealms delId={item.id}/></td>
                                        </tr>
                                    )
                                }) : null
                            }
                            </tbody>
                        </table>
                }
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

export default TweakRealm;
