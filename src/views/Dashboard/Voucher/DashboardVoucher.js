import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class DashboardVoucher extends Component {
    state = {
        vouchers: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        let cookie = new Cookies
        RadiusApi.get('/dashboard/voucher.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    vouchers: response.data.item,
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
                                    <i className="far fa-credit-card text-warning"/>
                                </div>
                            </Col>
                            {
                                this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                                    <Col xs="9">
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='mt-2 text-left ml-4'>
                                                        Total
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.vouchers.total}</h3>
                                                </Col>
                                            </Row>
                                        </Card.Title>

                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='mt-2 text-left ml-4'>
                                                        Active
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.vouchers.active}</h3>
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                        <Card.Title>
                                            <Row>
                                                <Col>
                                                    <div className='mt-2 text-left ml-4'>
                                                        Online
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <h3 className='text-right'>{this.state.vouchers.online}</h3>
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
                            <b>Voucher</b>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

export default DashboardVoucher;
