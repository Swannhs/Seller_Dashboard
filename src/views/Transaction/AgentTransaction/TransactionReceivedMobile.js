import React, {Component} from 'react';
import {AiOutlinePlusCircle} from "react-icons/all";

class TransactionReceivedMobile extends Component {
    state = {
        expandedRows: []
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState({expandedRows: newExpandedRows});
    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const itemRows = [
            <tr key={item.id}>
                <td><AiOutlinePlusCircle onClick={clickCallback} key={"row-data-" + item.id}/></td>
                <td>{item.user.username}</td>
                <td>{item.balance}$</td>
            </tr>
        ];

        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.id}>
                    <td>
                        <b>Voucher: {item.credit}</b>
                    </td>
                    <td>
                        <b> Realm: {item.realm.name}</b>
                    </td>
                    <td>
                        <b>Profile: </b>{item.profile.name}
                    </td>
                </tr>
            );
        }

        return itemRows;
    }

    render() {
        let allItemRows = [];

        this.props.data.forEach(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Sender</th>
                    <th scope="col">Cost</th>
                </tr>
                {allItemRows}
                </thead>
            </table>
        )
    }
}

export default TransactionReceivedMobile;
