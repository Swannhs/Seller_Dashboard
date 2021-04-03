import React, {Component} from "react";
import {Link} from "react-router-dom";

import {ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    AiFillDashboard,
    AiOutlineUser,
    BsListNested,
    BiMoney,
    MdAttachMoney,
    BsServer,
    AiOutlineCloudServer
} from "react-icons/all";
import {Nav} from "react-bootstrap";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";


class Sidebar extends Component {

    state = {
        root: false
    }

    componentDidMount() {
        const cookie = new Cookies
        RadiusApi.get('/dashboard/checkToken/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    root: response.data.data.isRootUser
                })
            })
    }

    render() {
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

                                        {
                                            this.state.root ? <Link to='/admin/root/voucher/transaction'>
                                                    Transaction
                                                </Link>
                                                : <Link to='/admin/voucher/transaction'>
                                                    Transaction
                                                </Link>
                                        }

                                    </MenuItem>
                                    <MenuItem icon={<MdAttachMoney/>}>
                                        {
                                            this.state.root ? <Link to='/admin/root/cash/transaction'>
                                                    Cash
                                                </Link>
                                                :
                                                <Link to='/admin/cash/transaction'>
                                                    Cash
                                                </Link>
                                        }
                                    </MenuItem>
                                    <>
                                        {
                                            this.state.root ?
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
                                                                Tweak
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
        );
    }
}

export default Sidebar;


