import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class DashboardServer extends Component {
    state = {
        servers: 0,
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        let cookie = new Cookies;
        RadiusApi.get('/dashboard/server-count.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    servers: response.data.servers,
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
                                    <i className="fas fa-server text-danger"/>
                                </div>
                            </Col>
                            {
                                this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                                    <Col xs="9">
                                        <div className="numbers">
                                            <Card.Title>
                                                <Row>
                                                    <Col>
                                                        <div className='text-left mt-2 ml-4'>Total</div>
                                                    </Col>
                                                    <Col>
                                                        <div className='text-right font-weight-bold mt-2 ml-4'>{this.state.servers}</div>
                                                    </Col>
                                                </Row>
                                            </Card.Title>
                                        </div>
                                    </Col>
                            }
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <hr/>
                        <div className="stats">
                            <b>Servers</b>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

export default DashboardServer;
