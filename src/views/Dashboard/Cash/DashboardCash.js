import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import RadiusApi from "../../../radius-api/RadiusApi";

class DashboardCash extends Component {
    state = {
        cash: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        RadiusApi.get('/dashboard/cash.json', {
            params: {
                token: localStorage.getItem('Token')
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
                            <Col xs="3">
                                <div className="icon-big text-center icon-warning">
                                    <i className="fas fa-money-bill-alt text-success"/>
                                </div>
                            </Col>
                            {
                                this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                                    <Col xs="9">
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='text-left mt-2 ml-4'>Payable</div>
                                                </Col>
                                                <Col>
                                                    <div className='text-right font-weight-bold mt-2'>{this.state.cash.payable}</div>
                                                </Col>
                                            </Row>
                                        </Card.Title>

                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='text-left mt-2 ml-4'>Paid</div>
                                                </Col>
                                                <Col>
                                                    <div className='text-right font-weight-bold mt-2'>{this.state.cash.paid}</div>
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='text-left mt-2 ml-4'>Receivable</div>
                                                </Col>
                                                <Col>
                                                    <div className='text-right font-weight-bold mt-2'>{this.state.cash.receivable}</div>
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='text-left mt-2 ml-4'>Received</div>
                                                </Col>
                                                <Col>
                                                    <div className='text-right font-weight-bold mt-2'>{this.state.cash.received}</div>
                                                </Col>
                                            </Row>
                                        </Card.Title>
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
