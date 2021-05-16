import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class AllUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: '',
            users: [],
        }
    }

    componentDidMount() {
        const token = new Cookies;
        RadiusApi.get('/access-providers/index-tree-grid.json',{
            params: {
                node: 0,
                token: token.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    users: response.data.items
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
            <>
                <h4 className='text-black-50'>Account</h4>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fas fa-user"/> </span>
                    </div>
                    <select className="form-control text-capitalize"
                            value={this.state.select}
                            onChange={event => {
                                this.setState({
                                    select: event.target.value
                                })
                            }}>
                        <option>Choose...</option>
                        {this.state.users.map((items) => {
                            return (
                                <>
                                    <option key={items.id} value={items.id}>{items.username}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
            </>

        );
    }
}

export default AllUser;
