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
                                                    <div className='mt-2 text-left ml-4'>
                                                        Balance
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.credit.balance}</h3>
                                                </Col>
                                            </Row>
                                        </Card.Title>

                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='mt-2 text-left ml-4'>
                                                        Credit
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.credit.credit}</h3>
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='mt-2 text-left ml-4'>
                                                        Debit
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.credit.debit}</h3>
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
                            <b>Credit</b>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

export default DashboardCredit;
