import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";

class VersionUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: '',
            users: [],
        }
    }

    componentDidMount() {
        RadiusApi.get('/versions/get-users.json',{
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    users: response.data.item
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
                <h4 className='text-black-50'>Reseller</h4>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fas fa-user"/> </span>
                    </div>
                    <select className="form-control"
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

export default VersionUser;
