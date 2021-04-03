import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import {Link} from "react-router-dom";
import VoucherGroup from "../Voucher/CreateVoucher/VoucherGroup";
import GetTweak from "../Transaction/GetTweak";

class CreateTweakRealm extends Component {
    state = {
        tweak: '',
        realm: ''
    }

    onGenerateTweak = () => {
        let data = this.state
        RadiusApi.post('/tweak-realms/add.json', data)
            .then(response => {
                console.log(response)
            })
    }

    onSelectTweak = async data => {
        this.setState({
            tweak: data
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
                    <Link to='/admin/root/tweak-realms'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>
                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <VoucherGroup onChange={this.onSelectGroup}/>
                    <GetTweak onChange={this.onSelectTweak}/>

                    <button className='ui button positive mt-4' onClick={this.onGenerateTweak}>
                        Generate
                    </button>
                </article>
            </>
        );
    }
}

export default CreateTweakRealm;
