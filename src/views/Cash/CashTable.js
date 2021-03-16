import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CashTable extends Component {
    render() {
        return (
            <>
                <div className="ui grid">
                    <div className="ui text-right floated column">
                        <Link to='/admin/cash/transfer'>
                            <button className='ui button primary'>
                                Pay
                            </button>
                        </Link>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Trx ID</th>
                        <th scope="col">Partner</th>
                        <th scope="col">Payable</th>
                        <th scope="col">Receivable</th>
                        <th scope="col">Status</th>
                        <th scope="col">Reference</th>
                    </tr>
                    </thead>
                    {/*<tbody>*/}
                    {/*{*/}
                    {/*    this.state.transactions ? this.state.transactions.map((item) => {*/}
                    {/*        return (*/}
                    {/*            <tr key={item.id}>*/}
                    {/*                <td>{item.id}</td>*/}
                    {/*                <td>{item.partner_user_id}</td>*/}
                    {/*                <td>{item.balance}</td>*/}
                    {/*                <td>{item.credit}</td>*/}
                    {/*                <td>{item.debit}</td>*/}
                    {/*            </tr>*/}
                    {/*        )*/}
                    {/*    }) : null*/}
                    {/*}*/}
                    {/*</tbody>*/}
                </table>
            </>
        );
    }
}

export default CashTable;