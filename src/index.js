import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./assets/css/animate.min.css";
import "./assets/scss/main-style.scss";
import "./assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'semantic-ui-css/semantic.min.css'

import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
)
