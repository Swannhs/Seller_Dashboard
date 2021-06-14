import React, {Component} from "react";
import {
    Container,
    Row,
} from "react-bootstrap";
import DashboardVoucher from "./Voucher/DashboardVoucher";
import DashboardServer from "./Server/DashboardServer";
import DashboardCredit from "./Credit/DashboardCredit";


class Dashboard extends Component {
    state = {
        root: ''
    }
    componentDidMount() {
        this.setState({
            root: localStorage.getItem('Role')
        })
    }

    render() {
        return (
            <>
                {/* ----------------------- Card Section  -------------------------------*/}

                <Container>
                    <Row>
                        {/*------------------------------Credit Section Start----------------------------*/}
                        <DashboardCredit/>
                        {/*------------------------------Credit Section End----------------------------*/}

                        {/*------------------------------Voucher Section Start--------------------------*/}
                        <DashboardVoucher/>
                        {/*------------------------------Voucher Section End--------------------------*/}

                        {/*------------------------------Cash Section Start----------------------------*/}
                        {/*<DashboardCash/>*/}
                        {/*------------------------------Cash Section End----------------------------*/}

                        {/*------------------------------Server Section Start----------------------------*/}
                        {
                            this.state.root === 'admin' ?
                                <DashboardServer/>: <></>
                        }
                        {/*------------------------------Server Section End----------------------------*/}
                    </Row>
                    {/*---------------------------- End Card Section ------------------------------*/}

                </Container>
            </>
        );
    }
}

export default Dashboard;
