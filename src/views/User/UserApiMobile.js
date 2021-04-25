import React, {Component} from 'react';
import Cookies from "universal-cookie";
import RadiusApi from "../../radius-api/RadiusApi";
import {AiFillEdit, AiOutlineArrowRight, AiOutlineEye, AiOutlinePlusCircle, BiReset} from "react-icons/all";
import {Pagination} from "semantic-ui-react";
import {Link} from "react-router-dom";
import DeleteUser from "./Action/DeleteUser";

class UserApiMobile extends Component {
    state = {
        data: [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        refresh: true,
        expandedRows : []
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
                        data: response.data.items,
                        total: response.data.totalCount
                    })
                }
            )
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState({expandedRows : newExpandedRows});
    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const itemRows = [
            <tr key={item.id}>
                <td><AiOutlinePlusCircle onClick={clickCallback} key={"row-data-" + item.id}/></td>
                <td className='text-center text-capitalize'>{item.username}</td>
                <td className='text-center' data-label="Action">
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
        ];

        if(this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.id}>
                    <td>
                        <AiOutlineArrowRight/>
                    </td>
                    <td className='text-center' data-label="Role"><b>Role: </b>
                        {
                            item.role === 'agent' ? <span className='text-primary'>Agent</span> :
                                <span className='text-warning'>Seller</span>
                        }
                    </td>
                    {/*<td className='d-none d-sm-block' data-label="Area">{item.username}</td>*/}


                    {/*<td data-label="Status">*/}
                    {/*    {item.active ? <span className='text-success'>Active</span>*/}
                    {/*        : <span className='text-danger'>Inactive</span>}</td>*/}

                    <td className='text-center'><b>Status: </b>
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
                </tr>
            );
        }

        return itemRows;
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
        let allItemRows = [];

        this.state.data.forEach(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <>
                <tbody>{allItemRows}</tbody>
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

export default UserApiMobile;
