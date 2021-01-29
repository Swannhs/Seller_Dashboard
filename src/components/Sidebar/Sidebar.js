import React from "react";
import {useLocation, NavLink} from "react-router-dom";
import {Link} from "react-router-dom";

import {Nav} from "react-bootstrap";


function Sidebar({routes}) {
    const location = useLocation();
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <Link
                        to="/"
                        className="simple-text logo-mini mx-1"
                    >
                        <div className="logo-img">
                            <img
                                src={require("assets/img/reactlogo.png").default}
                                alt="..."
                            />
                        </div>
                    </Link>
                    <Link className="simple-text" to='/'>
                        Radius Admin
                    </Link>
                </div>
                <Nav>
                    {routes.map((prop, key) => {
                        if (!prop.redirect)
                            return (
                                <li
                                    className={
                                        prop.upgrade
                                            ? "active active-pro"
                                            : activeRoute(prop.layout + prop.path)
                                    }
                                    key={key}
                                >
                                    <NavLink
                                        to={prop.layout + prop.path}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        <i className={prop.icon}/>
                                        <p>{prop.name}</p>
                                    </NavLink>
                                </li>
                            );
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;
