import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            {/*<ul className="footer-menu">*/}
            {/*  <li>*/}
            {/*    <a href="#pablo" onClick={(e) => e.preventDefault()}>*/}
            {/*      Home*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <a href="#pablo" onClick={(e) => e.preventDefault()}>*/}
            {/*      Company*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <a href="#pablo" onClick={(e) => e.preventDefault()}>*/}
            {/*      Portfolio*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <a href="#pablo" onClick={(e) => e.preventDefault()}>*/}
            {/*      Blog*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*</ul>*/}
            <p className="copyright text-center"> 
              {window.env.APP_VERSION} © {new Date().getFullYear()} <a href="#"> {document.title}</a>, All rights reserved. <i>Powered by the <b>SecureTunnel.</b></i>
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
