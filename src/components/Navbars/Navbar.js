import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Navbar, Container, Nav} from "react-bootstrap";
import routes from "routes.js";
import {
    AiFillDashboard, AiOutlineCloudServer, AiOutlineUser, BiMoney, BsListNested, BsServer,
} from "react-icons/all";
import {isMobile} from 'react-device-detect';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            name: '',
        }
    }


    componentDidMount() {
        this.setState({
            role: localStorage.getItem('Role'),
            name: localStorage.getItem('Name')
        })
    }

    //----------------Sidebar open button-------------------------
    // mobileSidebarToggle = (e) => {
    //     e.preventDefault();
    //     document.documentElement.classList.toggle("nav-open");
    //     // let node = document.createElement("div");
    //     // node.id = "bodyClick";
    //     // node.onclick = function () {
    //     //     this.parentElement.removeChild(this);
    //     //     document.documentElement.classList.toggle("nav-open");
    //     // };
    //     // document.body.appendChild(node);
    // };
    //----------------Sidebar open button------------------------

    getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
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
                        {/*    onClick={this.mobileSidebarToggle}*/}
                        {/*>*/}
                        {/*    <BsChevronDoubleRight/>*/}
                        {/*</Button>*/}
                        {/*-----------------------Sidebar Open button-----------------------*/}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2" id='navbar-togglered'>
                            <span className="navbar-toggler-bar burger-lines"/>
                            <span className="navbar-toggler-bar burger-lines"/>
                            <span className="navbar-toggler-bar burger-lines"/>
                        </Navbar.Toggle>

                        <Navbar.Brand
                            onClick={(e) => e.preventDefault()}
                            className="mr-2"
                        >
                            {this.getBrandText()}
                        </Navbar.Brand>


                    </div>

                    {
                        isMobile ?
                            <div className='justify-content-end'>
                                <div className="dropdown">
                                    <div className="dropdown-toggle" id="dropdownMenuButton"
                                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="no-icon">
                                            <i className="fas fa-user-alt"/> {this.state.name}
                                        </span>
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-right"
                                         aria-labelledby="dropdownMenuButton">
                                        <Link to='/admin/profile' className='dropdown-item'>
                                            Profile
                                        </Link>
                                        <div className="dropdown-item"
                                             onClick={() => {
                                                 localStorage.clear();
                                             }}
                                        >
                                            <Link to='/login' className='text-danger'>
                                                Logout
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <></>
                    }
                    {/*<Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2" id='navbar-togglered'>*/}
                    {/*    <span className="navbar-toggler-bar burger-lines"/>*/}
                    {/*    <span className="navbar-toggler-bar burger-lines"/>*/}
                    {/*    <span className="navbar-toggler-bar burger-lines"/>*/}
                    {/*</Navbar.Toggle>*/}


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
                                                            <AiOutlineUser/> Resellers
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

                                        {
                                            this.state.role === 'admin' ?
                                                <>

                                                    <Nav.Item>
                                                        <Nav.Link
                                                            className='m-0'
                                                            onClick={() => {
                                                                document.getElementById('navbar-togglered').click();
                                                            }}
                                                        >
                                                            <Link to='/admin/root/server'>
                                                                <BsServer/> Server
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
                                                            <Link to='/admin/root/server-realms'>
                                                                <BsServer/> Server Realm
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
                                                            <Link to='/admin/root/tweak'>
                                                                <AiOutlineCloudServer/> Tweak
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
                                                            <Link to='/admin/root/tweak-realms'>
                                                                <AiOutlineCloudServer/> Tweak Realm
                                                            </Link>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </>
                                                : null
                                        }
                                        {/*<Nav.Item>*/}
                                        {/*    <Nav.Link*/}
                                        {/*        className="m-0"*/}
                                        {/*        onClick={event => {*/}
                                        {/*            event.preventDefault()*/}
                                        {/*            document.getElementById('navbar-togglered').click();*/}
                                        {/*        }}*/}
                                        {/*    >*/}
                                        {/*        <Link to='/admin/profile'>*/}
                                        {/*            <span className="no-icon">*/}
                                        {/*                <i className="fas fa-user-alt"/> Hi, {this.state.name}*/}
                                        {/*            </span>*/}
                                        {/*        </Link>*/}
                                        {/*    </Nav.Link>*/}
                                        {/*</Nav.Item>*/}
                                    </>
                                    :
                                    <>

                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>

                    {
                        isMobile ? <></>
                            :
                            <Navbar.Collapse className='justify-content-end'>

                                <div className="dropdown">
                                    <div className="dropdown-toggle" id="dropdownMenuButton"
                                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="no-icon">
                                            <i className="fas fa-user-alt"/> Hi, {this.state.name}
                                        </span>
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-right"
                                         aria-labelledby="dropdownMenuButton">
                                        <Link to='/admin/profile' className='dropdown-item'>
                                            Profile
                                        </Link>
                                        <div className="dropdown-item text-danger">Logout</div>
                                    </div>
                                </div>
                            </Navbar.Collapse>
                    }

                </Container>
            </Navbar>
        )
    }
}

export default Header;
