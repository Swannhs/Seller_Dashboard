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

            <Container fluid>
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

                    <Col lg="3" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon fas fa-bed text-primary"/>
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Unused</p>
                                            <Card.Title as="h4">12</Card.Title>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className="stats">
                                    <i className="fas fa-redo mr-1"></i>
                                    Update now
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

                {/*---------------------------- End Card Section ------------------------------*/}

            </Container>
        </>
    );
}

export default Dashboard;
