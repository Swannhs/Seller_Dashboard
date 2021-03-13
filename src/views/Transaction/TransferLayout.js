import React, {Component} from 'react';
import TransactionSent from "./AgentTransaction/TransactionSent";
import TransactionReceive from "./AgentTransaction/TransactionReceive";

class TransferLayout extends Component {
    state = {
        sent: false
    }


    render() {
        return (
            <>
                <div className='text-center'>
                    <div className="ui buttons">
                        <button className="ui red button"
                                onClick={() => {
                                    this.setState({
                                        sent: true
                                    })
                                }}>
                            Sent
                        </button>
                        <div className="or"/>
                        <button className="ui positive button"
                                onClick={() => {
                                    this.setState({
                                        sent: false
                                    })
                                }}>
                            Received
                        </button>
                    </div>
                </div>
                {

                    this.state.sent ? <TransactionSent/> : <TransactionReceive/>
                }

            </>
        );
    }
}

export default TransferLayout;
