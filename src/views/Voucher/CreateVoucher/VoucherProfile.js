import React, {Component} from 'react';
import RadiusApi from "../../../radius-api/RadiusApi";

class VoucherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: '',
            profile: []
        }
    }

    componentDidMount() {
        RadiusApi.get('/profiles/index-ap.json', {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    profile: response.data.items
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevState !== this.state){
            this.props.onChange(this.state.select)
        }
    }


    onHandleChange = event => {
        event.preventDefault();

        this.setState({
            select: event.target.value
        })
    }


    render() {
        return (
            <>
                <h4 className='text-black-50'>Plan</h4>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-coins"/> </span>
                    </div>
                    <select className="form-control text-capitalize"
                            value={this.state.select}
                            onChange={event => this.onHandleChange(event)}>
                        <option>Choose...</option>
                        {this.state.profile.map((items) => {
                            return (
                                <>
                                    <option key={items.id} value={items.id}>{items.name}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
            </>
        );
    }
}

export default VoucherProfile;
