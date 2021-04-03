import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";

class DashboardCash extends Component {
    state = {
        cash: [],
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/dashboard/cash.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    cash: response.data.cash
                })
            })
    }

    render() {
        return (
            <Col lg="3" sm="6">
                <Card className="card-stats">
                    <Card.Body>
                        <Row>
                            <Col xs="5">
                                <div className="icon-big text-center icon-warning">
                                    <i className="nc-icon fas fa-money-bill text-success"/>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Cash</p>
                                    <Card.Title as="h4">
                                        Payable: ${this.state.cash[0]? this.state.cash[0].payable: 0}
                                    </Card.Title>
                                    <Card.Title as="h4">
                                        Receivable: ${this.state.cash[0]? this.state.cash[0].receivable: 0}
                                    </Card.Title>
                                    <Card.Title as="h4">
                                        Received: $0
                                    </Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <i className="far fa-calendar-alt mr-1"/>
                            Last day
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

export default DashboardCash;
