import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {AiFillEdit} from "react-icons/all";
import {Pagination} from "semantic-ui-react";
import DeleteVersion from "./DeleteVersion";

class Version extends Component {
    state = {
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        loading: true,
        versions: []
    }
    componentDidMount() {
        this.onApiCall();
    }

    onApiCall = () => {
        RadiusApi.get('/versions/index.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    versions: response.data.item,
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
                                <Link to='/admin/root/version-create'>
                                    <button className='ui button primary'>
                                        New
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">App(User)</th>
                        <th scope="col">App Version</th>
                        <th scope="col">Server Version</th>
                        <th scope="col">Tweak Version</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.versions ? this.state.versions.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.user.username}</td>
                                    <td>{item.app_version}</td>
                                    <td>{item.server_version}</td>
                                    <td>{item.tweak_version}</td>
                                    <td>
                                        <Link to={'/admin/root/version-edit/' + item.id}>
                                            <Button className='btn-sm btn-primary'>
                                                <AiFillEdit/>
                                            </Button>
                                        </Link>
                                        <DeleteVersion id={item.id} refresh={this.onApiCall}/>

                                    </td>
                                </tr>
                            )
                        }) : null
                    }
                    </tbody>
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
        );
    }
}

export default Version;
