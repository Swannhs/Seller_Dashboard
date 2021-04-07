import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Input} from "reactstrap";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";

class CashTransfer extends Component {
    state = {
        partner_user_id: '',
        partner_user_name: '',
        paid: '',
    }

    componentDidMount() {
        const cookie = new Cookies()
        RadiusApi.get('/balance-transactions/parent.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    partner_user_id: response.data.id,
                    partner_user_name: response.data.username
                })
            })
    }

    onCashTransaction = () => {
        const cookie = new Cookies()
        let data = this.state
        RadiusApi.post('/balance-transactions/add.json', data, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                if (response.data.status){
                    alert('Transfer amount successfully')
                    this.props.history.push('/admin/cash/transaction')
                }else {
                    alert(response.data.message)
                }
            })
    }

    render() {
        return (
            <div className='container'>
                <div className='ml-3'>
                    <Link to='/admin/cash/transaction'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>
                    <h3>Note: You are going to transfer money with -> <span className='text-uppercase'>{this.state.partner_user_name}</span>
                    </h3>
                    <Input type='number'
                           placeholder='The amount you want to transfer'
                           value={this.state.paid}
                           onChange={event => {
                               this.setState({
                                   paid: event.target.value
                               })
                           }}
                           required={true}
                    />


                    <button className='ui button primary mt-4'
                            onClick={this.onCashTransaction}
                    >
                        Transfer
                    </button>
                </article>
            </div>
        );
    }
}

export default CashTransfer;
