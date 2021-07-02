import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import {AiFillEdit, AiOutlineEye} from "react-icons/all";
import {Button} from "reactstrap";
import {Pagination} from "semantic-ui-react";

class Tweak extends Component {
    state = {
        tweaks: [],
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
        RadiusApi.get('/tweaks/index.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    tweaks: response.data.tweaks,
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
        this.setState({
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
                                <Link to='/admin/root/tweak-new'>
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
                        <th scope="col">Name</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Protocols</th>
                        <th scope="col">Injection Type</th>
                        <th scope="col">SNI</th>
                        <th scope="col">Payload</th>
                        <th scope="col">Target Port</th>
                        <th scope="col">Country Tags</th>
                        <th scope="col">Network Tags</th>
                        <th scope="col">Note</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.tweaks ? this.state.tweaks.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.vendor}</td>
                                    <td>{item.protocols}</td>
                                    <td>{item.injection_type}</td>
                                    <td>{item.sni}</td>
                                    <td>{item.payload}</td>
                                    <td>{item.target_port}</td>
                                    <td>
                                        {
                                            item.country_tags.map((item) => {
                                                return <a className="ui violet label">{item}</a>
                                            })
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.network_tags.map((item) => {
                                                return <a className="ui orange label">{item}</a>
                                            })
                                        }
                                    </td>
                                    <td>{item.note}</td>
                                    <td>
                                        <Link to={'/admin/root/tweak-view/' + item.id}>
                                            <Button className='btn-sm btn-success'>
                                                <AiOutlineEye/>
                                            </Button>
                                        </Link>
                                        <Link to={'/admin/root/tweak-edit/' + item.id}>
                                            <Button className='btn-sm btn-primary ml-1'>
                                                <AiFillEdit/>
                                            </Button>
                                        </Link>
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

export default Tweak;
