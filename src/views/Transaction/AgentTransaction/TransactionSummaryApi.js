import React, {Component} from 'react';
import {Link} from "react-router-dom";

class TransactionSummaryApi extends Component {

    render() {
        return (
            <>
                <thead>
                <tr className='ct-grid-background border-primary'>
                    <th scope="col">Reseller</th>
                    <th scope="col">Vendor</th>
                    <th scope="col">Plan</th>
                    <th scope="col">Credit</th>
                    <th scope="col">Debit</th>
                    <th scope='col'>Balance</th>
                    {/*<th scope='col'>Action</th>*/}
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data ? this.props.data.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.user.username}</td>
                                <td>{item.realm.name}</td>
                                <td>{item.profile.name}</td>
                                <td>{item.credit}</td>
                                <td>{item.debit}</td>
                                <td>{item.balance}</td>

                                {/*<td>*/}
                                {/*    <Link to={'/admin/voucher/transactions/' + item.id}>*/}
                                {/*        Details*/}
                                {/*    </Link>*/}
                                {/*</td>*/}
                            </tr>
                        )
                    }) : <h3 className='text-danger'>No record available</h3>
                }
                </tbody>
            </>

        );
    }
}

export default TransactionSummaryApi;
