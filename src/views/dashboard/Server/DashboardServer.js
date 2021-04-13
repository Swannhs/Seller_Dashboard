import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import RadiusApi from "../../../radius-api/RadiusApi";

class DashboardServer extends Component {
    state = {
        servers: 0
    }

    componentDidMount() {
        RadiusApi.get('/dashboard/server.json')
            .then(response => {
                this.setState({
                    servers: response.data.servers
                })
            })
    }

    render() {
        return (
            <Col lg="4" sm="6">
                <Card className="card-stats">
                    <Card.Body>
                        <Row>
                            <Col xs="5">
                                <div className="icon-big text-center icon-warning">
                                    <i className="nc-icon fas fa-microchip text-danger"/>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Server</p>
                                    <Card.Title as="h4">Total: 30</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="far fa-clock-o mr-1"/>
                            In the last hour
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

export default DashboardServer;
