import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";

class DashboardCash extends Component {
    state = {
        cash: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        let cookie = new Cookies
        RadiusApi.get('/dashboard/cash.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    cash: response.data.item,
                    loading: false
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
                                    <i className="fas fa-money-bill-alt text-success"/>
                                </div>
                            </Col>
                            {
                                this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                                    <Col xs="7">
                                        <div className="numbers">
                                            <Card.Title>
                                                Payable: $ {this.state.cash.payable}
                                            </Card.Title>
                                            <Card.Title>
                                                Paid: $ {this.state.cash.paid}
                                            </Card.Title>
                                            <Card.Title>
                                                Receivable: $ {this.state.cash.receivable}
                                            </Card.Title>
                                            <Card.Title>
                                                Received: $ {this.state.cash.received}
                                            </Card.Title>
                                        </div>
                                    </Col>
                            }
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                            <b>Payments</b>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

export default DashboardCash;
