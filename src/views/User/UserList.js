import React, {Component} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Link} from "react-router-dom";
import UserApi from "./UserApi";
import UserApiMobile from "./UserApiMobile";


class VoucherApi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            page: 1,
            start: 0,
            limit: 10,
            total: 0,
            refresh: true,
            mobile: false
        }
    }

    componentDidMount() {
        this.setState({mobile: window.innerWidth <= 660})
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

                <table className="table table-striped">
                    <thead>
                    <tr className='ct-grid-background border-primary'>
                        {
                            this.state.mobile ?
                                <th>
                                    #
                                </th> : null
                        }
                        <th scope="col">Name</th>
                        {
                            this.state.mobile ? <></> :
                                <>

                                    <th scope="col">Role</th>

                                        <th scope="col">Status</th>
                                        {/*<Dropdown text='Status' multiple icon='filter'>*/}
                                        {/*    <Dropdown.Menu>*/}
                                        {/*        <Dropdown.Menu scrolling>*/}
                                        {/*            <Dropdown.Item>Active</Dropdown.Item>*/}
                                        {/*            <Dropdown.Item>Inactive</Dropdown.Item>*/}
                                        {/*        </Dropdown.Menu>*/}
                                        {/*    </Dropdown.Menu>*/}
                                        {/*</Dropdown>*/}
                                </>
                        }
                        <th scope="col">Actions</th>

                    </tr>
                    </thead>


                    {/*-----------------Calling User List Api---------------------*/}
                    {
                        this.state.mobile ? <UserApiMobile/> : <UserApi/>
                    }
                    {/*-----------------Calling User List Api---------------------*/}
                </table>
            </>
        );
    }
}

export default VoucherApi;
