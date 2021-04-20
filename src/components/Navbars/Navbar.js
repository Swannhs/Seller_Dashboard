import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Navbar, Container, Nav, Dropdown, Button} from "react-bootstrap";

import routes from "routes.js";
import Cookies from "universal-cookie/lib";
import {Input} from "reactstrap";
import {BiSearch} from "react-icons/all";

function Header() {
    const location = useLocation();


    const onLogout = () => {
        const cookie = new Cookies;
        cookie.remove('Token', null)

    }


    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        let node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };


    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    <Button
                        variant="dark"
                        className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        onClick={mobileSidebarToggle}
                    >
                        <i className="fas fa-ellipsis-v"/>
                    </Button>
                    <Navbar.Brand
                        href="#home"
                        onClick={(e) => e.preventDefault()}
                        className="mr-2"
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
                    <span className="navbar-toggler-bar burger-lines"/>
                    <span className="navbar-toggler-bar burger-lines"/>
                    <span className="navbar-toggler-bar burger-lines"/>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav mr-auto" navbar>
                        <Nav.Item>
                            <Nav.Link
                                data-toggle="dropdown"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                className="m-0"
                            >
                                <span className="d-lg-none ml-1">Dashboard</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Link to='/admin/profile'>
                                    <span className="no-icon">Account</span>
                                </Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Link to='/login'>
                                    <button className="ui red button" onClick={onLogout}>Log out</button>
                                </Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
