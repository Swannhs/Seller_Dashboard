import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import {AiFillEdit, AiOutlineEye} from "react-icons/all";
import {Button} from "reactstrap";

class Tweak extends Component {
    state = {
        tweaks: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/tweaks/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    tweaks: response.data.tweaks
                })
            })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/root/tweak-new'>
                                    <button className='ui button primary'>
                                        New
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Protocols</th>
                        <th scope="col">Injection Type</th>
                        <th scope="col">Payload</th>
                        <th scope="col">Note</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.tweaks ? this.state.tweaks.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.vendor}</td>
                                    <td>{item.protocols}</td>
                                    <td>{item.injection_type}</td>
                                    <td>{item.payload}</td>
                                    <td>{item.note}</td>
                                    <td>
                                        <Link to={'/admin/root/tweak-view/' + item.id}>
                                            <Button className='btn-sm btn-success'>
                                                <AiOutlineEye/>
                                            </Button>
                                        </Link>
                                        <Link to={'/admin/root/tweak-edit/' + item.id}>
                                            <Button className='btn-sm btn-primary ml-1'>
                                                <AiFillEdit/>
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }) : null
                    }
                    </tbody>
                </table>
            </>
        );
    }
}

export default Tweak;
