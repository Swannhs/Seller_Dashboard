import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Cookies from "universal-cookie";
import {AiFillDelete, AiFillEdit, AiOutlineEye, BiReset} from "react-icons/all";
import {Dropdown, Loader, Pagination} from "semantic-ui-react";
import DeleteUser from "./Action/DeleteUser";
import {Link} from "react-router-dom";


class VoucherApi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userData: [],
            active: null,
            page: 1,
            start: 0,
            limit: 5,
            total: 0
        }
    }

    onApiCall() {
        const cookie = new Cookies;
        RadiusApi.get('/access-providers/index.json', {
            params: {
                //Assign limit of row showing in table
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: cookie.get('Token')
            }
        })
            .then(response => this.setState({
                loading: false,
                userData: response.data.items,
                total: response.data.totalCount
            }))
    }



    componentDidMount() {
        this.onApiCall();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState.page !== this.state.page ? this.onApiCall() : null
    }

    onPagination() {
        let totalPage = this.state.total / this.state.limit
        return Math.trunc(totalPage) + parseInt((totalPage % 1).toFixed())
    }



    onHandleChange = event => {
        this.setState({
            active: event.target.checked
        })
    }


    render() {
        return (
            <>

                {/* ---------------- New Button Start ----------------*/}
                <div className="ui grid">

                    <div className="ui text-right floated column">
                        <Link to='/admin/users/create'>
                            <button className='ui button primary'>
                                New
                            </button>
                        </Link>
                    </div>
                </div>

                {/* ---------------- New Button End ----------------*/}

                <table className="table table-bordered text-center mt-3" style={{fontSize: '20px'}}>

                    <thead>
                    <tr className='ct-grid-background border-primary'>
                        <th>
                            <h4 className='text-center'>
                                Name
                            </h4>

                        </th>

                        {/*<th className='d-none d-sm-block'>*/}
                        {/*    <h4 className='text-center'>*/}
                        {/*        Area*/}
                        {/*    </h4>*/}
                        {/*</th>*/}

                        <th>
                            <h4 className='text-center'>
                                Balance
                            </h4>
                        </th>
                        <th className='w-25'>
                            <h4 className='text-center'>
                                <Dropdown text='Status' multiple icon='filter'>
                                    <Dropdown.Menu>
                                        <Dropdown.Menu scrolling>
                                            <Dropdown.Item>Active</Dropdown.Item>
                                            <Dropdown.Item>Inactive</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </h4>
                        </th>
                        <th>
                            <h4 className='text-center'>
                                Actions
                            </h4>
                        </th>

                    </tr>
                    </thead>

                    <tbody>
                    {(this.state.userData) ? this.state.userData.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td data-label="Name">{item.username}</td>
                                {/*<td className='d-none d-sm-block' data-label="Area">{item.username}</td>*/}
                                <td data-label="Balance">10$</td>


                                {/*<td data-label="Status">*/}
                                {/*    {item.active ? <span className='text-success'>Active</span>*/}
                                {/*        : <span className='text-danger'>Inactive</span>}</td>*/}

                                <td>
                                    <div className="ui toggle checkbox center aligned">
                                        <input type="checkbox" name="public"
                                            // value={item.active}
                                               onChange={event => this.onHandleChange(event)}
                                               checked={item.active}
                                        />
                                        <label/>
                                    </div>
                                </td>


                                <td data-label="Action">
                                    <BiReset/>
                                    <AiOutlineEye/>
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
                                    defaultActivePage={1}
                                    firstItem={null}
                                    lastItem={null}
                                    pointing
                                    secondary
                                    totalPages={this.onPagination()}
                                    onPageChange={(event, data) => {
                                        this.setState({
                                            page: data.activePage,
                                            start: this.state.page * this.state.limit
                                        })
                                    }}
                                />
                            </div>
                        </th>
                    </tr>
                    </tfoot>
                    {/*--------------------Pagination End------------------------*/}

                </table>
            </>
        );
    }
}

export default VoucherApi;
