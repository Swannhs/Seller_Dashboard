import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";

class ViewTweakUi extends Component {
    state = {
        tweak: [],
        loading: false
    }

    componentDidMount() {
        RadiusApi.get('/tweaks/view.json', {
            params: {
                token: localStorage.getItem('Token'),
                id: this.props.id
            }
        })
            .then(response => {
                this.setState({
                    tweak: response.data.data
                })
            })
    }

    render() {
        return (
            <div className="container">
                <div className='ml-3'>
                    <Link to='/admin/root/tweak'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>
                <>
                    {
                        this.state.loading ? <div className="ui active centered inline loader mt-3"/> :
                            <div className="main-body mt-2 ml-3">
                                <div className="row gutters-sm">
                                    <div className="col-md-8">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.tweak.name}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Vendor</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.tweak.vendor}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Protocols</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.tweak.protocols}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Injection Type</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.tweak.injection_type}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Payload</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.tweak.payload}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Note</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.state.tweak.note}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </>
            </div>
        );
    }
}

export default ViewTweakUi;
