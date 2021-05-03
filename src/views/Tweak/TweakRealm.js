import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";
import DeleteTweakRealms from "./DeleteTweakRealms";

class TweakRealm extends Component {
    state = {
        tweakRealms: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/Tweak-realms/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    tweakRealms: response.data.tweakRealms
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
                                <Link to='/admin/root/tweak-realm/new'>
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
                        <th scope="col">Tweaks</th>
                        <th scope="col">Realms</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.tweakRealms ? this.state.tweakRealms.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.tweak.name}</td>
                                    <td>{item.realm.name}</td>
                                    <td><DeleteTweakRealms delId={item.id}/></td>
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

export default TweakRealm;
