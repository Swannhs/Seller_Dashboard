import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import {Form} from "react-bootstrap";

class GetServer extends Component {
    state = {
        select: '',
        servers: []
    }

    componentDidMount() {
        const token = new Cookies;
        RadiusApi.get('/Server-realms/servers.json',{
            params: {
                token: token.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    servers: response.data.servers
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState !== this.state ? this.props.onChange(this.state.select) : null
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.servers)
    }

    render() {
        return (
            <Form.Group>
                <div className="w-50 p-3">
                    <h3 className='text-black-50'>Servers</h3>
                    <Form.Control
                        as="select"
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                        value={this.state.select}
                        onChange={event => {
                            this.setState({
                                select: event.target.value
                            })
                        }}
                    >
                        <option>Choose...</option>

                        {this.state.servers.map((items) => {
                            return (
                                <>
                                    <option key={items.id} value={items.id}>{items.name}</option>
                                </>
                            )
                        })}
                    </Form.Control>
                </div>
            </Form.Group>
        );
    }
}

export default GetServer;
