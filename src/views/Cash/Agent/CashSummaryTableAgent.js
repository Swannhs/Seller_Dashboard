import React, {Component} from 'react';
import {Link} from "react-router-dom";
import RadiusApi from "../../../radius-api/RadiusApi";
import Cookies from "universal-cookie/es6";

class CashSummaryTableAgent extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/balance-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    items: response.data.item
                })
            })
    }

    render() {
        return (
            <>
                {
                    this.state.items ? this.state.items.map((item) => {
                        console.log(item)
                        return (
                            <div key={item.id} className="container">
                                <div className="main-body mt-2 ml-3">
                                    <div className="row gutters-sm">
                                        <div className="col-md-4 mb-3">
                                            <div className="card">

                                                <div className="card-body">
                                                    <div className="d-flex flex-column align-items-center text-center">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
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
        )
    }
}

export default CashSummaryTableAgent;



//----------------Previous Configuration------------------
// import React, {Component} from 'react';
// import Cookies from "universal-cookie/lib";
// import RadiusApi from "../../../radius-api/RadiusApi";
// import {Link} from "react-router-dom";
//
// class CashSummaryTableAgent extends Component {
//     state = {
//         items: []
//     }
//
//     componentDidMount() {
//         let cookie = new Cookies
//         RadiusApi.get('/balance-transactions/index.json', {
//             params: {
//                 token: cookie.get('Token')
//             }
//         })
//             .then(response => {
//                 this.setState({
//                     items: response.data.item
//                 })
//             })
//     }
//
//     render() {
//         return (
//             <>
//                 <div className="ui grid">
//                     <div className="ui text-right floated column">
//                         <Link to='/admin/cash/transfer'>
//                             <button className='ui button primary'>
//                                 Pay
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//
//                 <table className="table table-striped">
//                     <thead>
//                     <tr>
//                         <th scope="col">Payable</th>
//                         <th scope="col">Paid</th>
//                         <th scope="col">Receivable</th>
//                         <th scope="col">Received</th>
//                         <th scope="col">Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {
//                         this.state.items ? this.state.items.map((item) => {
//                             return (
//                                 <tr key={item.id}>
//                                     <td>{item.payable}</td>
//                                     <td>{item.paid}</td>
//                                     <td>{item.receivable}</td>
//                                     <td>{item.received}</td>
//                                     <td>
//                                         <Link to={'/admin/cash/transactions/' + item.id}>
//                                             Details
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             )
//                         }) : null
//                     }
//                     </tbody>
//                 </table>
//             </>
//         );
//     }
// }
//
// export default CashSummaryTableAgent;

