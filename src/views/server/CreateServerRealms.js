import React, {Component} from 'react';
import {Link} from "react-router-dom";
import VoucherGroup from "../Voucher/CreateVoucher/VoucherGroup";
import GetServer from "../Transaction/GetServer";
import RadiusApi from "../../radius-api/RadiusApi";

class CreateServerRealms extends Component {
    state = {
        server: '',
        realm: ''
    }

    onGenerateServer = () => {
        let data = this.state
        RadiusApi.post('/server-realms/add.json', data)
            .then(response => {
                console.log(response)
            })
    }

    onSelectServer = async data => {
        this.setState({
            server: data
        })
    }

    onSelectGroup = async data => {
        this.setState({
            realm: data
        })
    }


    render() {
        return (
            <>
                <div className='ml-3'>
                    <Link to='/admin/root/server-realms'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <VoucherGroup onChange={this.onSelectGroup}/>
                    <GetServer onChange={this.onSelectServer}/>

                    <button className='ui button positive mt-4' onClick={this.onGenerateServer}>
                        Generate
                    </button>
                </article>

            </>
        );
    }
}

export default CreateServerRealms;
