import React from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
    Button,
    Card,
    Table,
    Container,
    Row,
    Col,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import DashboardVoucher from "./Voucher/DashboardVoucher";
import DashboardCash from "./Cash/DashboardCash";
import DashboardServer from "./Server/DashboardServer";

function Dashboard() {
    return (
        <>
            {/* ----------------------- Card Section  -------------------------------*/}

            <Container>
                <Row>

                    {/*------------------------------Voucher Section Start--------------------------*/}
                    <DashboardVoucher/>
                    {/*------------------------------Voucher Section End--------------------------*/}

                    {/*------------------------------Cash Section Start----------------------------*/}
                    <DashboardCash/>
                    {/*------------------------------Cash Section End----------------------------*/}

                    {/*------------------------------Server Section Start----------------------------*/}
                    <DashboardServer/>
                    {/*------------------------------Cash Section End----------------------------*/}
                </Row>
                {/*---------------------------- End Card Section ------------------------------*/}

            </Container>
        </>
    );
}

export default Dashboard;
