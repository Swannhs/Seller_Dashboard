import React, {Component} from "react";
import {Link} from "react-router-dom";
import {ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    AiFillDashboard,
    AiOutlineUser,
    BsListNested,
    BiMoney,
    BsServer,
    AiOutlineCloudServer
} from "react-icons/all";
import {Nav} from "react-bootstrap";
import {isMobile} from "react-device-detect";


class Sidebar extends Component {

    state = {
        role: '',
        app_name: document.title
    }

    componentDidMount() {
        this.setState({
            role: localStorage.getItem('Role')
        })
    }

    //----------------Sidebar open button-------------------------
    mobileSidebarToggle = (e) => {
        e.preventDefault();
        if (isMobile) {
            document.getElementsByClassName('nav-open')[0].className = '';
        }

    };

    //----------------Sidebar open button------------------------

    render() {

        return (
            <>
                {
                    isMobile ? <></> :
                        <div className="sidebar">
                            <div className="sidebar-wrapper">
                                <div className="logo d-flex align-items-center justify-content-start">
                                    <Link
                                        to="/admin/dashboard"
                                        className="simple-text logo-mini mx-1"
                                    >
                                    </Link>
                                    <Link className="simple-text text-capitalize" to='/admin/dashboard'>
                                        {this.state.app_name}
                                    </Link>
                                </div>
                                <Nav>

                                    <li>
                                        <ProSidebar>
                                            <Menu iconShape="square">
                                                <MenuItem icon={<AiFillDashboard/>}
                                                          onClick={() => this.mobileSidebarToggle(event)}
                                                >
                                                    <Link to='/admin/dashboard'>
                                                        Dashboard
                                                    </Link>
                                                </MenuItem>
                                                {
                                                    this.state.role === 'admin' || this.state.role === 'agent' ?

                                                        <MenuItem icon={<AiOutlineUser/>}
                                                                  onClick={() => this.mobileSidebarToggle(event)}
                                                        >
                                                            <Link to='/admin/users/view'>
                                                                Resellers
                                                            </Link>
                                                        </MenuItem>

                                                        : <></>
                                                }

                                                <MenuItem icon={<BsListNested/>}
                                                          onClick={() => this.mobileSidebarToggle(event)}
                                                >
                                                    <Link to='/admin/voucher/view'>
                                                        Vouchers
                                                    </Link>
                                                </MenuItem>

                                                <MenuItem icon={<BiMoney/>}
                                                          onClick={() => this.mobileSidebarToggle(event)}
                                                >

                                                    {
                                                        this.state.role === 'admin' ?
                                                            <Link to='/admin/root/voucher/transaction'>
                                                                Credits
                                                            </Link>
                                                            : <Link to='/admin/voucher/transaction'>
                                                                Credits
                                                            </Link>
                                                    }

                                                </MenuItem>

                                                {/*<MenuItem icon={<MdAttachMoney/>}>*/}
                                                {/*    {*/}
                                                {/*        this.state.role === 'admin' ?*/}
                                                {/*            <Link to='/admin/root/cash/transaction'>*/}
                                                {/*                Payments*/}
                                                {/*            </Link>*/}
                                                {/*            :*/}
                                                {/*            <Link to='/admin/cash/transaction'>*/}
                                                {/*                Payments*/}
                                                {/*            </Link>*/}
                                                {/*    }*/}

                                                {/*</MenuItem>*/}
                                                <>
                                                    {
                                                        this.state.role === 'admin' ?
                                                            <>
                                                                <SubMenu title='Server' icon={<BsServer/>}>
                                                                    <MenuItem>
                                                                        <Link to='/admin/root/server'>
                                                                            Servers
                                                                        </Link>
                                                                    </MenuItem>
                                                                    <MenuItem>
                                                                        <Link to='/admin/root/server-realms'>
                                                                            Server-Realms
                                                                        </Link>
                                                                    </MenuItem>
                                                                </SubMenu>

                                                                <SubMenu title='Tweak' icon={<AiOutlineCloudServer/>}>
                                                                    <MenuItem>
                                                                        <Link to='/admin/root/tweak'>
                                                                            Tweaks
                                                                        </Link>
                                                                    </MenuItem>
                                                                    <MenuItem>
                                                                        <Link to='/admin/root/tweak-realms'>
                                                                            Tweak-Realms
                                                                        </Link>
                                                                    </MenuItem>
                                                                </SubMenu>
                                                            </>
                                                            : null
                                                    }
                                                </>

                                            </Menu>
                                        </ProSidebar>
                                    </li>
                                </Nav>
                            </div>
                        </div>
                }
            </>
        );
    }

}

export default Sidebar;
