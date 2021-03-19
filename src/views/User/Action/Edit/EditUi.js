import React, {Component} from 'react';
import Cookies from "universal-cookie";
import RadiusApi from "../../../../radius-api/RadiusApi";
import {Link} from "react-router-dom";

class EditUi extends Component {
    state = {
        id: this.props.id,
        username: '',
        name: '',
        email: '',
        address: '',
        language: '4_4'
    }


    componentDidMount() {
        const cookie = new Cookies;
        RadiusApi.get('/access-providers/view.json', {
            params: {
                ap_id: this.props.id,
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    username: response.data.data.username,
                    name: response.data.data.name,
                    email: response.data.data.email,
                    address: response.data.data.address
                })
            })
    }


    onUserEditSubmit = () => {
        const cookie = new Cookies;
        const data = this.state
        RadiusApi.post('/access-providers/edit.json', data, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                response.data.success ? alert('Updated successfully') : alert(response.data.errors.username)
            })
    }


    render() {
        return (
            <>
                <div className='ml-3'>
                    <Link to='/admin/users/view'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>


                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>

                    <h2 className="card-title mt-3 text-center p-3">Edit Account</h2>

                    {/*------------User Name--------------*/}

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"/> </span>
                        </div>
                        <input name className="form-control" placeholder='User Name' type="text"
                               value={this.state.username}
                               onChange={event => {
                                   this.setState({
                                       username: event.target.value
                                   })
                               }}
                        />
                    </div>
                    {/*-------------------Name -----------------*/}
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"/> </span>
                        </div>
                        <input name className="form-control" placeholder='Name' type="text"
                               value={this.state.name}
                               onChange={event => {
                                   this.setState({
                                       name: event.target.value
                                   })
                               }}
                        />
                    </div>

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope"/> </span>
                        </div>
                        <input name className="form-control" placeholder="Email address" type="email"
                               value={this.state.email}
                               onChange={event => {
                                   this.setState({email: event.target.value})
                               }}
                        />
                    </div>

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"/> </span>
                        </div>
                        <input name className="form-control" placeholder="Address" type="text"
                               value={this.state.address}
                               onChange={event => this.setState({address: event.target.value})}
                        />
                    </div>


                    <button className="ui positive button" onClick={this.onUserEditSubmit}>
                        Update
                    </button>

                </article>

            </>
        );
    }
}

export default EditUi;
