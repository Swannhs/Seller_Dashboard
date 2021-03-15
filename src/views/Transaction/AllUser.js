import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";

class AllUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: '',
            users: [],
        }
    }

    componentDidMount() {
        const cookie = new Cookies;

        RadiusApi.get('/voucher-transactions/getUsers.json', {
            params: {
                'token': cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    select: '',
                    users: response.data.user
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        prevState !== this.state ? this.props.onChange(this.state.select) : null
    }


    onFormSubmit = event => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.transaction)
    }


    render() {
        return (
            <Form.Group>
                <div className="w-50 p-3">
                    <h3 className='text-black-50'>Account</h3>
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

                        {this.state.users.map((items) => {
                            return (
                                <>
                                    <option key={items.id} value={items.id}>{items.username}</option>
                                </>
                            )
                        })}
                    </Form.Control>
                </div>
            </Form.Group>
        );
    }
}

export default AllUser;
