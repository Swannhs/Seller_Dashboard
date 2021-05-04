import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TransactionSummaryApi from "./TransactionSummaryApi";
import TransactionSummaryApiMobile from "./TransactionSummaryApiMobile";
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {isMobile} from "react-device-detect";

class TransactionSummaryTable extends Component {
    state = {
        data: [],
        role: '',
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        let cookie = new Cookies
        RadiusApi.get('/voucher-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    data: response.data.item,
                    role: cookie.get('Role'),
                    loading: false
                })
            })
    }

    render() {
        return (
            <>
                {
                    this.state.loading ? <div className="ui active centered inline loader"/> :
                        <>
                            {
                                this.state.role === 'agent' || this.state.role === 'admin' ?
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
                                    : <></>
                            }
                            <table className="table table-striped">

                                {/*    -------------------------Table Api goes here------------------------------*/}
                                {
                                    isMobile ? <TransactionSummaryApiMobile data={this.state.data}/> :
                                        <TransactionSummaryApi data={this.state.data}/>
                                }
                                {/*    -------------------------Table Api goes here------------------------------*/}
                            </table>
                        </>
                }
            </>
        );
    }

}

export default TransactionSummaryTable;
