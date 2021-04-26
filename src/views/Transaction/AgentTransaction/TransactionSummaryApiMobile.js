import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import {AiOutlinePlusCircle, BiCommentDetail, BiDetail, BiReset} from "react-icons/all";
import {Link} from "react-router-dom";

class TransactionSummaryApiMobile extends Component {
    state= {
        data: [],
        expandedRows : []
    }
    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/voucher-transactions/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    data: response.data.item
                })
            })
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState({expandedRows : newExpandedRows});
    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);
        const itemRows = [
            <tr key={item.id}>
                <td><AiOutlinePlusCircle onClick={clickCallback} key={"row-data-" + item.id}/></td>
                <td>{item.profile.name}</td>
                <td>{item.balance}</td>
            </tr>
        ];

        if(this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.id}>
                    <td>
                        <td>
                            <Link to={'/admin/voucher/transactions/' + item.id}>
                                <BiDetail/>
                            </Link>
                        </td>
                    </td>
                    <td>
                        <b>  Realm: {item.realm.name}</b>
                    </td>
                    <td>
                        <b>Debit: </b>{item.debit}
                        <b className='pl-3'>Credit: </b>{item.credit}
                    </td>
                </tr>
            );
        }

        return itemRows;
    }

    onPagination() {
        let totalPage = this.state.total / this.state.limit
        return Math.trunc(totalPage) + parseInt((totalPage % 1).toFixed())
    }

    async onPageChaneHandler(event, data) {
        await this.setState({
            page: data.activePage,
            start: (data.activePage - 1) * this.state.limit
        })
    }

    render() {
        let allItemRows = [];

        this.state.data.forEach(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <tbody>{allItemRows}</tbody>
        );
    }
}

export default TransactionSummaryApiMobile;
