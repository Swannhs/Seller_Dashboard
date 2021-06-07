import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Navbar, Container, Nav, Dropdown, Button} from "react-bootstrap";
import routes from "routes.js";
import {AiFillDashboard, AiOutlineUser, BiMoney, BsListNested} from "react-icons/all";
import Cookies from "universal-cookie/lib";
import {isMobile} from 'react-device-detect';

class Header extends Component {
    state = {
        role: '',
        name: ''
    }

    componentDidMount() {
        let cookie = new Cookies
        this.setState({
            role: cookie.get('Role'),
            name: cookie.get('Name')
        })
    }

    //----------------Sidebar open button-------------------------
    // mobileSidebarToggle = (e) => {
    //     e.preventDefault();
    //     document.documentElement.classList.toggle("nav-open");
    //     let node = document.createElement("div");
    //     node.id = "bodyClick";
    //     node.onclick = function () {
    //         this.parentElement.removeChild(this);
    //         document.documentElement.classList.toggle("nav-open");
    //     };
    //     document.body.appendChild(node);
    // };
    //----------------Sidebar open button------------------------

    getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Vpn";
    };

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">

                        {/*-----------------------Sidebar Open button-----------------------*/}
                        {/*<Button*/}
                        {/*    variant="dark"*/}
                        {/*    className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"*/}
                        {/*    onClick={mobileSidebarToggle}*/}
                        {/*>*/}
                        {/*    <i className="fas fa-ellipsis-v"/>*/}
                        {/*</Button>*/}
                        {/*-----------------------Sidebar Open button-----------------------*/}
                        <Navbar.Brand
                            onClick={(e) => e.preventDefault()}
                            className="mr-2"
                        >
                            {this.getBrandText()}
                        </Navbar.Brand>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2" id='navbar-togglered'>
                        <span className="navbar-toggler-bar burger-lines"/>
                        <span className="navbar-toggler-bar burger-lines"/>
                        <span className="navbar-toggler-bar burger-lines"/>
                    </Navbar.Toggle>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto" navbar>
                            {
                                isMobile ?
                                    <>
                                        <Nav.Item>
                                            <Nav.Link
                                                className='m-0'
                                                onClick={() => {
                                                    document.getElementById('navbar-togglered').click();
                                                }}
                                            >
                                                <Link to='/admin/dashboard'>
                                                    <div>
                                                        <AiFillDashboard/> Dashboard
                                                    </div>
                                                </Link>
                                            </Nav.Link>
                                        </Nav.Item>
                                        {
                                            this.state.role === 'agent' ?
                                                <Nav.Item>
                                                    <Nav.Link
                                                        className='m-0'
                                                        onClick={() => {
                                                            document.getElementById('navbar-togglered').click();
                                                        }}
                                                    >
                                                        <Link to='/admin/users/view'>
                                                            <AiOutlineUser/> Sellers
                                                        </Link>
                                                    </Nav.Link>
                                                </Nav.Item> : <></>
                                        }

                                        <Nav.Item>
                                            <Nav.Link
                                                className='m-0'
                                                onClick={() => {
                                                    document.getElementById('navbar-togglered').click();
                                                }}
                                            >
                                                <Link to='/admin/voucher/view'>
                                                    <BsListNested/> Vouchers
                                                </Link>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link
                                                className='m-0'
                                                onClick={() => {
                                                    document.getElementById('navbar-togglered').click();
                                                }}
                                            >
                                                <Link to='/admin/voucher/transaction'>
                                                    <BiMoney/> Credits
                                                </Link>
                                            </Nav.Link>
                                        </Nav.Item>
                                        {/*<Nav.Item>*/}
                                        {/*    <Nav.Link*/}
                                        {/*        className='m-0'*/}
                                        {/*        onClick={() => {*/}
                                        {/*            document.getElementById('navbar-togglered').click();*/}
                                        {/*        }}*/}
                                        {/*    >*/}
                                        {/*        <Link to='/admin/cash/transaction'>*/}
                                        {/*            <BiMoney/> Payments*/}
                                        {/*        </Link>*/}
                                        {/*    </Nav.Link>*/}
                                        {/*</Nav.Item>*/}
                                        <Nav.Item>
                                            <Nav.Link
                                                className="m-0"
                                                onClick={event => {
                                                    event.preventDefault()
                                                    document.getElementById('navbar-togglered').click();
                                                }}
                                            >
                                                <Link to='/admin/profile'>
                                                    <span className="no-icon">
                                                        <i className="fas fa-user-alt"/> Hi, {this.state.name}
                                                    </span>
                                                </Link>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                    :
                                    <>
                                        <Nav.Item>
                                            <Nav.Link
                                                className="m-0"
                                                onClick={event => {
                                                    event.preventDefault()
                                                    document.getElementById('navbar-togglered').click();
                                                }}
                                            >
                                                <Link to='/admin/profile'>
                                                    <span className="no-icon">
                                                        <i className="fas fa-user-alt"/> Hi, {this.state.name}
                                                    </span>
                                                </Link>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;
