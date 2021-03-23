import React, {Component} from 'react';
import {Input} from "reactstrap";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";

class GenerateBalance extends Component {
    state = {
        amount: ''
    }


    onGenerate = () => {
        const cookie = new Cookies()
        let data = this.state
        RadiusApi.post('//voucher-transaction-details/generate.json', data, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                alert('Amount generate successfully')
                this.props.history.push('/admin/root/voucher/transaction')

            })
    }

    render() {
        return (
            <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                <Input type='number'
                       placeholder='The amount you want to transfer'
                       value={this.state.amount}
                       onChange={event => {
                           this.setState({
                               amount: event.target.value
                           })
                       }}
                       required={true}
                />

                <button className='ui button positive' onClick={this.onGenerate}>
                    Generate
                </button>
            </article>
        );
    }
}

export default GenerateBalance;
