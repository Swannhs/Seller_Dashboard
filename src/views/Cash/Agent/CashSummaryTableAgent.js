import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/es6";

class CashSummaryTableAgent extends Component {
    state = {
        items: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        let cookie = new Cookies
        RadiusApi.get('/balance-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    items: response.data.item,
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
                                this.state.items ? this.state.items.map((item) => {
                                    return (
                                        <div key={item.id} className="container">
                                            <div className="main-body mt-2 ml-3">
                                                <div className="row gutters-sm">
                                                    <div className="col-md-4 mb-3">
                                                        <div className="card">

                                                            <div className="card-body">
                                                                <div
                                                                    className="d-flex flex-column align-items-center text-center">
                                                                    <img
                                                                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                                        alt="Admin"
                                                                        className="rounded-circle" width={150}/>
                                                                    <div className="mt-3">
                                                                        <h4 className='text-uppercase'>{item.user.username}</h4>
                                                                    </div>
                                                                    <div className="mt-3">
                                                                        <h4 className='text-uppercase'>{item.user.role}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-8">
                                                        <div className="card mb-3">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-sm-3">
                                                                        <h6 className="mb-0">Payable</h6>
                                                                    </div>
                                                                    <div className="col-sm-9 text-danger">
                                                                        {item.payable}

                                                                    </div>
                                                                </div>
                                                                <hr/>
                                                                <div className="row">
                                                                    <div className="col-sm-3">
                                                                        <h6 className="mb-0">Paid</h6>
                                                                    </div>
                                                                    <div className="col-sm-9 text-success">
                                                                        {item.paid}
                                                                    </div>
                                                                </div>
                                                                <hr/>
                                                                <div className="row">
                                                                    <div className="col-sm-3">
                                                                        <h6 className="mb-0">Receivable</h6>
                                                                    </div>
                                                                    <div className="col-sm-9 text-danger">
                                                                        {item.receivable}
                                                                    </div>
                                                                </div>
                                                                <hr/>
                                                                <div className="row">
                                                                    <div className="col-sm-3">
                                                                        <h6 className="mb-0">Received</h6>
                                                                    </div>
                                                                    <div className="col-sm-9 text-success">
                                                                        {item.received}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <Link to={'/admin/cash/transactions/' + item.id}>
                                                                <button className='ui button positive small'>
                                                                    Details
                                                                </button>
                                                            </Link>
                                                            <Link to='/admin/cash/transfer'>
                                                                <button className='ml-5 ui button primary small'>
                                                                    Pay
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <></>
                            }
                        </>
                }
            </>
        )
    }

}

export default CashSummaryTableAgent;
