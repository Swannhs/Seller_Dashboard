import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import VersionUser from "../../components/Dropdown/VersionUser";

class CreateVersion extends Component {
    state = {
        userId: null,
        appVersion: '',
        serverVersion: '',
        tweakVersion: ''
    }
    onCreatePartner = async data => {
        this.setState({
            userId: data
        })
    }

    onCreateVersion = () => {
        event.preventDefault();
        RadiusApi.post('/versions/add.json', this.state, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.status){
                    alert(response.data.message)
                    this.props.history.push('/admin/root/version')
                }
            })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='ml-3'>
                        <Link to='/admin/root/version'>
                            <button className='ui button'>Back</button>
                        </Link>
                    </div>

                    <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                        <form onSubmit={this.onCreateVersion}>

                            <VersionUser onChange={this.onCreatePartner}/>

                            <h4 className='text-black-50'>App Version</h4>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fab fa-android"/>
                                </span>
                                </div>
                                <input className="form-control" placeholder="Version" type="number"
                                       value={this.state.appVersion}
                                       onChange={event => {
                                           this.setState({
                                               appVersion: event.target.value
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
                                       value={this.state.serverVersion}
                                       onChange={event => {
                                           this.setState({
                                               serverVersion: event.target.value
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
                                       value={this.state.tweakVersion}
                                       onChange={event => {
                                           this.setState({
                                               tweakVersion: event.target.value
                                           })
                                       }}
                                       required={true}
                                />
                            </div>

                            <button className='ui button primary mt-2' type='submit'>
                                Create
                            </button>
                        </form>
                    </article>

                </div>
            </>
        );
    }
}

export default CreateVersion;
