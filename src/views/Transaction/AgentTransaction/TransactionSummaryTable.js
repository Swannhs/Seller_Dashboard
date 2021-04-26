import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TransactionSummaryApi from "./TransactionSummaryApi";
import TransactionSummaryApiMobile from "./TransactionSummaryApiMobile";

class TransactionSummaryTable extends Component {
    state = {
        summary: [],
        role: '',
        mobile: false
    }

    componentDidMount() {

        this.setState({mobile: window.innerWidth <= 660})
    }

    render() {
        return (
            <>
                {
                    this.state.role === 'agent' ?
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <div className="ui text-right floated column">
                                        <Link to='/admin/voucher/transfer'>
                                            <button className='ui button primary'>
                                                Transfer
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <></>
                }


                <table className="table table-striped">
                    <thead>
                    <tr className='ct-grid-background border-primary'>
                        {
                            this.state.mobile ?
                                <th>
                                    #
                                </th> : null
                        }
                        <th scope="col">Profile</th>
                        <th scope='col'>Voucher</th>

                        {
                            this.state.mobile ? <></> :
                                <>
                                    <th scope="col">Realm</th>
                                    <th scope="col">Credit</th>
                                    <th scope="col">Debit</th>
                                    <th scope='col'>Action</th>
                                </>
                        }

                    </tr>
                    </thead>

                    {/*    -------------------------Table Api goes here------------------------------*/}
                    {
                        this.state.mobile ? <TransactionSummaryApiMobile/> : <TransactionSummaryApi/>
                    }
                    {/*    -------------------------Table Api goes here------------------------------*/}
                </table>
            </>

        );
    }
}

export default TransactionSummaryTable;
