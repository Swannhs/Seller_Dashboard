import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {Card, Col, Row} from "react-bootstrap";

class DashboardCredit extends Component {
    state = {
        credit: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        let cookie = new Cookies
        RadiusApi.get('/dashboard/credit.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    credit: response.data.item,
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
                                    <i className="far fa-money-bill text-info"/>
                                </div>
                            </Col>
                            {
                                this.state.loading ? <div className="mt-5 ui active centered inline loader mt-3"/> :
                                    <Col xs="9">
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='text-left mt-2 ml-4'>Balance</div>
                                                </Col>
                                                <Col>
                                                    <div className='text-right font-weight-bold mt-2 ml-4'>{this.state.credit.balance}</div>
                                                </Col>
                                            </Row>
                                        </Card.Title>

                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='text-left mt-2 ml-4'>Credit</div>
                                                </Col>
                                                <Col>
                                                    <div className='text-right font-weight-bold mt-2 ml-4'>{this.state.credit.credit}</div>
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='text-left mt-2 ml-4'>Debit</div>
                                                </Col>
                                                <Col>
                                                    <div className='text-right font-weight-bold mt-2 ml-4'>{this.state.credit.debit}</div>
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                    </Col>
                            }
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr/>
                        <div className="stats">
                            <b>Credits</b>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

export default DashboardCredit;
