import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Input} from "reactstrap";

class CashTransfer extends Component {
    state = {
        transfer_amount: ''
    }

    render() {
        return (
            <div className='container'>
                <div className='ml-3'>
                    <Link to='/admin/cash/transfer'>
                        <button className='ui button'>Back</button>
                    </Link>
                </div>

                <article className="card-body mx-auto" style={{maxWidth: '350px', fontSize: '20px'}}>

                    <Input type='number'
                           placeholder='The amount you want to transfer'
                           value={this.state.transfer_amount}
                           onChange={event => {
                               this.setState({
                                   transfer_amount: event.target.value
                               })
                           }}
                           required={true}
                    />

                    <button className='ui button primary'>
                        Transfer
                    </button>
                </article>
            </div>
        );
    }
}

export default CashTransfer;