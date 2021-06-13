import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

class ProfileDropdown extends Component {
    state = {
        role: '',
        name: '',
        redirect: false
    }


    componentDidMount() {
        this.setState({
            role: localStorage.getItem('Role'),
            name: localStorage.getItem('Name')
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='justify-content-end'>
                <div className="dropdown">
                    <div className="dropdown-toggle" id="dropdownMenuButton"
                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="no-icon">
                                            <i className="fas fa-user-alt"/> {this.state.name}
                                        </span>
                    </div>
                    <div className="dropdown-menu dropdown-menu-right"
                         aria-labelledby="dropdownMenuButton">
                        <Link to='/admin/profile' className='dropdown-item'>
                            Profile
                        </Link>
                        <Link to='/admin/api/logout'>
                            <div className="dropdown-item text-danger">
                                Logout
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileDropdown;
