import React from "react";
import {Link} from "react-router-dom";

import {ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {AiFillDashboard, AiOutlineUser, BsListNested, BiMoney, MdAttachMoney} from "react-icons/all";
import {Nav} from "react-bootstrap";


function Sidebar() {
    // const location = useLocation();
    // const activeRoute = (routeName) => {
    //     return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    // };
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <Link
                        to="/"
                        className="simple-text logo-mini mx-1"
                    >
                    </Link>
                    <Link className="simple-text" to='/'>
                        Radius Admin
                    </Link>
                </div>
                <Nav>

                    <li>
                        <ProSidebar>
                            <Menu iconShape="square">
                                <MenuItem icon={<AiFillDashboard/>}>
                                    <Link to='/admin/dashboard'>
                                        Dashboard
                                    </Link>
                                </MenuItem>
                                <MenuItem icon={<AiOutlineUser/>}>
                                    <Link to='/admin/users/view'>
                                        User
                                    </Link>
                                </MenuItem>
                                <MenuItem icon={<BsListNested/>}>
                                    <Link to='/admin/voucher/view'>
                                        Voucher
                                    </Link>
                                </MenuItem>
                                <MenuItem icon={<BiMoney/>}>
                                    <Link to='/admin/voucher/transaction'>
                                        Transaction
                                    </Link>
                                </MenuItem>
                                <MenuItem icon={<MdAttachMoney/>}>
                                    <Link to='/admin/cash/transaction'>
                                        Cash
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </ProSidebar>
                    </li>


                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;


