import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class DashboardVoucher extends Component {
    state = {
        vouchers: [],
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/dashboard/voucher.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    vouchers: response.data.item
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
                                    <i className="nc-icon fas fa-credit-card text-warning"/>
                                </div>
                            </Col>
                            <Col xs="7">
                                <div className="numbers">
                                    <p className="card-category">Voucher</p>
                                    <Card.Title
                                        as="h4">
                                        Total: {this.state.vouchers[0] ? this.state.vouchers[0].total : 0}
                                    </Card.Title>
                                    <Card.Title as="h4">
                                        Active: {this.state.vouchers[0] ? this.state.vouchers[0].active : 0}
                                    </Card.Title>
                                    <Card.Title as="h4">Online: 13</Card.Title>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr/>
                        <div className="stats">
                            <i className="fas fa-redo mr-1"/>
                            Update Now
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

export default DashboardVoucher;
