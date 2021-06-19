import React, {Component} from 'react';
import RadiusApi from "../../../../radius-api/RadiusApi";
import {Link, Redirect} from "react-router-dom";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {toast} from "react-toastify";

class EditUi extends Component {
    state = {
        id: this.props.id,
        parent_id: '0',
        username: '',
        name: '',
        surname: '',
        active: '',
        phone: '',
        email: '',
        address: '',
        role: '',
        language: '4_4',
        redirect: false
    }


    componentDidMount() {
        RadiusApi.get('/access-providers/view.json', {
            params: {
                ap_id: this.props.id,
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                this.setState({
                    active: response.data.data.active,
                    username: response.data.data.username,
                    name: response.data.data.name,
                    email: response.data.data.email,
                    surname: response.data.data.surname,
                    address: response.data.data.address,
                    role: response.data.data.role
                })
            })
    }


    onUserEditSubmit = event => {
        event.preventDefault();
        let data = this.state
        if (!this.state.active){
            delete data.active;
        }
        delete data.redirect;

        RadiusApi.post('/access-providers/edit.json', data, {
            params: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        redirect: true
                    })
                    // alert('Updated successfully');
                    toast.success('Updated successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Updated unsuccessfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }



    render() {
        if (this.state.redirect) {
            return <Redirect to='/admin/users/view'/>;
        }
        return (
            <>
                <div className="container" style={{fontSize: '20px'}}>
                    <div className='ml-3'>
                        <Link to='/admin/users/view'>
                            <button className='ui button'>Back</button>
                        </Link>
                    </div>

                    <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>


                        <h2 className="card-title mt-3 text-center p-3">Update Account</h2>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"/> </span>
                            </div>
                            <input name className="form-control" placeholder="User Name" type="text"
                                   disabled={true}
                                   value={this.state.username}
                                   onChange={event => this.setState({username: event.target.value})}
                                   required={true}
                            />
                        </div>

                        {/*<div className="form-group input-group">*/}
                        {/*    <div className="input-group-prepend">*/}
                        {/*        <span className="input-group-text"> <i className="fa fa-building"/> </span>*/}
                        {/*    </div>*/}
                        {/*    <select className="form-control text-capitalize" value={this.state.role}*/}
                        {/*            onChange={event => this.setState({role: event.target.value})}*/}
                        {/*            disabled={true}>*/}
                        {/*        <option selected={true} className='text-capitalize'>{this.state.role}</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}

                        {/*-----------------------Active Status-----------------------------*/}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.active}
                                    onChange={event => {
                                        this.setState({
                                            active: event.target.checked
                                        })
                                    }}
                                    name="active"
                                    color="secondary"
                                />
                            }
                            label="Active Status"
                        />
                        {/*-----------------------Active Status-----------------------------*/}


                        <p className='mr-0 p-0 text-danger'>{this.state.errors ? this.state.errors.username : null}</p>


                        {/* -------------------------Personal Info-------------------// */}


                        <h4 className="card-title mt-3 text-center">Personal Information</h4>
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
                        {/* form-group// */}
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-phone"/> </span>
                            </div>
                            <input name className="form-control" placeholder="Phone number" type="number"
                                   value={this.state.phone}
                                   onChange={event => {
                                       this.setState({phone: event.target.value})
                                   }}
                            />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"/> </span>
                            </div>
                            <input name className="form-control" placeholder="Name" type="text"
                                   value={this.state.name}
                                   onChange={event => this.setState({name: event.target.value})}
                            />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"/> </span>
                            </div>
                            <input name className="form-control" placeholder="Surname" type="text"
                                   value={this.state.surname}
                                   onChange={event => this.setState({surname: event.target.value})}
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
                        <div className="form-group">
                            <button onClick={this.onUserEditSubmit} className="ui button positive">
                                Update
                            </button>
                        </div>
                    </article>
                </div>
            </>
        );
    }
}

export default EditUi;
