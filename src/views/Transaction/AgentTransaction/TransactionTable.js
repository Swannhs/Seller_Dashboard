import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TransactionReceive from "./TransactionReceive";
import TransactionSent from "./TransactionSent";
import {isMobile} from "react-device-detect";
import TransactionReceivedMobileApi from "./TransactionReceivedMobileApi";
import TransactionSentMobileApi from "./TransactionSentMobileApi";

class TransactionTable extends Component {
    state = {
        send: false
    }

    componentDidMount() {
        this.setState({
            send: false
        })
    }

    onTrueHandel = () => {
        this.setState({
            send: false
        })
    }

    onFalseHandel = () => {
        this.setState({
            send: true
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

                <div className='mt-3 text-center'>
                    <div className="ui buttons">
                        <button className="ui button red small"
                                onClick={() => {
                                    this.onTrueHandel()
                                }}
                        >Sent
                        </button>

                        <div className="or"/>

                        <button className="ui button positive small button"
                                onClick={() => {
                                    this.onFalseHandel()
                                }}>
                            Received
                        </button>
                    </div>
                </div>
                {
                    isMobile ? <>
                            {
                                this.state.send ? <TransactionReceivedMobileApi id={this.props.match.params.id}/> :
                                    <TransactionSentMobileApi id={this.props.match.params.id}/>
                            }
                        </> :
                        <>
                            {
                                this.state.send ? <TransactionReceive id={this.props.match.params.id}/> :
                                    <TransactionSent id={this.props.match.params.id}/>
                            }
                        </>
                }

            </>
        );
    }
}

export default TransactionTable;
