import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AllUser from "../../components/Dropdown/AllUser";
import RadiusApi from "../../radius-api/RadiusApi";
import {Redirect} from "react-router";

class EditVersionUi extends Component {
    state = {
        id: this.props.id,
        app_id: null,
        userId: null,
        app_version: '',
        server_version: '',
        tweak_version: '',
        redirect: false
    }

    componentDidMount() {
        RadiusApi.get('/versions/view.json', {
            params: {
                id: this.props.id,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    app_id: response.data.item.id,
                    userId: response.data.item.user_id,
                    app_version: response.data.item.app_version,
                    server_version: response.data.item.tweak_version,
                    tweak_version: response.data.item.server_version
                })
            })
    }

    onVersionUpdate = () => {
        event.preventDefault();
        let data = this.state
        delete data['redirect']
        RadiusApi.post('/versions/update.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert(response.data.message)
                    this.setState({
                        redirect: true
                    })
                } else {
                    alert(response.data.message)
                }
            })
    }

    onCreatePartner = async data => {
        this.setState({
            userId: data
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/admin/root/version'/>;
        }
        return (
            <>
                <div className='container'>
                    <div className='ml-3'>
                        <Link to='/admin/root/version'>
                            <button className='ui button'>Back</button>
                        </Link>
                    </div>

                    <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                        <form onSubmit={this.onVersionUpdate }>
                            <h4 className='text-black-50'>App ID</h4>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-android"/>
                                </span>
                                </div>
                                <input className="form-control" placeholder="ID" type="number"
                                       value={this.state.app_id}
                                       onChange={event => {
                                           this.setState({
                                               app_id: event.target.value
                                           })
                                       }}
                                       required={true}
                                />
                            </div>

                            <AllUser onChange={this.onCreatePartner}/>

                            <h4 className='text-black-50'>App Version</h4>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-android"/>
                                </span>
                                </div>
                                <input className="form-control" placeholder="Version" type="number"
                                       value={this.state.app_version}
                                       onChange={event => {
                                           this.setState({
                                               app_version: event.target.value
                                           })
                                       }}
                                       required={true}
                                />
                            </div>


                            <h4 className='text-black-50'>Server Version</h4>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-server"/>
                                </span>
                                </div>
                                <input className="form-control" placeholder="Server" type="number"
                                       value={this.state.server_version}
                                       onChange={event => {
                                           this.setState({
                                               server_version: event.target.value
                                           })
                                       }}
                                       required={true}
                                />
                            </div>

                            <h4 className='text-black-50'>Tweak Version</h4>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-align-justify"/>
                                </span>
                                </div>
                                <input className="form-control" placeholder="Tweak" type="number"
                                       value={this.state.tweak_version}
                                       onChange={event => {
                                           this.setState({
                                               tweak_version: event.target.value
                                           })
                                       }}
                                       required={true}
                                />
                            </div>

                            <button className='ui button green mt-2' type='submit'>
                                Update
                            </button>
                        </form>
                    </article>

                </div>
            </>
        );
    }
}

export default EditVersionUi;
