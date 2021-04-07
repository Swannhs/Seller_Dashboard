import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TransactionReceive from "./TransactionReceive";
import TransactionSent from "./TransactionSent";

class TransactionTable extends Component {
    state = {
        send: ''
    }

    componentDidMount() {
        this.setState({
            send: false
        })
    }

    onTrueHandel = () => {
        this.setState({
            sent: false
        })
    }

    onFalseHandel = () => {
        this.setState({
            sent: true
        })
    }


    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col-1'>
                            <div className="ui text-right floated column">
                                <Link to='/admin/voucher/transaction'>
                                    <button className='ui button'>
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-center'>
                    <div className="ui buttons">
                        <button className="ui button red"
                                onClick={() => {
                                    this.onTrueHandel()
                                }}
                        >Sent
                        </button>
                        <div className="or"/>
                        <button className="ui button positive"
                                onClick={() => {
                                    this.onFalseHandel()
                                }}>
                            Received
                        </button>
                    </div>
                </div>
                {this.state.sent ? <TransactionReceive id={this.props.match.params.id}/> :
                    <TransactionSent id={this.props.match.params.id}/>}
            </>
        );
    }
}

export default TransactionTable;
