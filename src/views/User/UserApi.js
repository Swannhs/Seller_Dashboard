import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Cookies from "universal-cookie";
import {Pagination} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {AiFillEdit, AiOutlineEye} from "react-icons/all";
import DeleteUser from "./Action/DeleteUser";


class VoucherApi extends Component {
    state = {
        userData: [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        refresh: true,
        mobile: false
    }

    componentDidMount() {
        const cookie = new Cookies;
        RadiusApi.get('/access-providers/index-tree-grid.json', {
            params: {
                //Assign limit of row showing in table
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                node: 0,
                token: cookie.get('Token')
            }
        })
            .then(response => {
                    this.setState({
                        loading: false,
                        userData: response.data.items,
                        total: response.data.totalCount
                    })
                }
            )
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
                            <td className='text-capitalize' data-label="Name">{item.username}</td>
                            <td data-label="Role">
                                {
                                    item.role === 'agent' ? <span className='text-primary'>Agent</span> :
                                        <span className='text-warning'>Seller</span>
                                }
                            </td>
                            {/*<td className='d-none d-sm-block' data-label="Area">{item.username}</td>*/}


                            {/*<td data-label="Status">*/}
                            {/*    {item.active ? <span className='text-success'>Active</span>*/}
                            {/*        : <span className='text-danger'>Inactive</span>}</td>*/}

                            <td>
                                {item.active ? <span className='text-success'>Active</span> :
                                    <span className='text-danger'>Inactive</span>}
                                {/*<div className="ui toggle checkbox center aligned">*/}
                                {/*    <input type="checkbox" name="public"*/}
                                {/*        // value={item.active}*/}
                                {/*           onChange={event => this.onHandleChange(event)}*/}
                                {/*           checked={item.active}*/}
                                {/*    />*/}
                                {/*    <label/>*/}
                                {/*</div>*/}
                            </td>


                            <td data-label="Action">
                                <Link to={'/admin/users/view/' + item.id}>
                                    <AiOutlineEye/>
                                </Link>
                                {/*<AiFillEdit onClick={this.onEditUser}/>*/}
                                <Link to={'/admin/users/edit/' + item.id}>
                                    <AiFillEdit/>
                                </Link>
                                <DeleteUser delId={item.id}/>
                            </td>

                        </tr>

                    )
                }) : <Loader type="ThreeDots" color="#00BFFF" height={80} width={80}/>

                }
                </tbody>
                {/*--------------------Pagination------------------------*/}
                <tfoot>
                <tr>
                    <th colSpan={5}>
                        <div className="ui right floated pagination menu">
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
                {/*--------------------Pagination End------------------------*/}
            </>
        );
    }
}

export default VoucherApi;
