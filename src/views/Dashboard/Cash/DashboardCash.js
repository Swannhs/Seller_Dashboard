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
                                                    <div className='mt-2 text-left ml-4'>
                                                        Payable
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.cash.payable}</h3>
                                                </Col>
                                            </Row>
                                        </Card.Title>

                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='mt-2 text-left ml-4'>
                                                        Paid
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.cash.paid}</h3>
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='mt-2 text-left ml-4'>
                                                        Receivable
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.cash.receivable}</h3>
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='mt-2 text-left ml-4'>
                                                        Received
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.cash.received}</h3>
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
