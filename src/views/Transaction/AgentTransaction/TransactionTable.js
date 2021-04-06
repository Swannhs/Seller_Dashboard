import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TransactionSent from "./TransactionSent";
import TransactionReceive from "./TransactionReceive";

class TransactionTable extends Component {
    state = {
        sent: true
    }

    render() {
        return (
            <>
                <div className='text-center'>
                    <div className="ui buttons">
                        <button className="ui button red"
                                onClick={() => {
                                    this.setState({
                                        sent: true
                                    })
                                }}
                        >Sent
                        </button>
                        <div className="or"/>
                        <button className="ui button positive"
                                onClick={() => {
                                    this.setState({
                                        sent: false
                                    })
                                }}>
                            Received
                        </button>
                    </div>
                </div>

                <div className="ui grid">
                    <div className="ui text-right floated column">
                        <Link to='/admin/voucher/transfer'>
                            <button className='ui button primary'>
                                Transfer
                            </button>
                        </Link>
                    </div>
                </div>

                {this.state.sent ? <TransactionSent/> : <TransactionReceive/>}
            </>
        );
    }
}

export default TransactionTable;
