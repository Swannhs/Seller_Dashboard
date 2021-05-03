import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import {Form} from "react-bootstrap";

class GetTweak extends Component {
    state = {
        select: '',
        tweaks: []
    }

    componentDidMount() {
        const token = new Cookies;
        RadiusApi.get('/Tweak-realms/tweaks.json',{
            params: {
                token: token.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    tweaks: response.data.tweaks
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState !== this.state ? this.props.onChange(this.state.select) : null
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.tweaks)
    }

    render() {
        return (
            <Form.Group>
                <div className="w-50 p-3">
                    <h3 className='text-black-50'>Tweaks</h3>
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

                        {this.state.tweaks.map((items) => {
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

export default GetTweak;
