import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";
import {AiOutlinePlusCircle, BiReset} from "react-icons/all";
import {Pagination} from "semantic-ui-react";

class VoucherApiMobile extends Component {
    state = {
        data : [],
        page: 1,
        start: 0,
        limit: 10,
        total: 0,
        refresh: true,
        expandedRows : []
    };
    componentDidMount() {
        const cookie = new Cookies
        RadiusApi.get('/vouchers/index-user-vouchers.json', {
            params: {
                page: this.state.page,
                start: this.state.start,
                limit: this.state.limit,
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    data: response.data.items,
                    total: response.data.totalCount
                })
            })
    }

    onVoucherReset = (props) => {
        let reset = {
            reset: props
        }

        let cookie = new Cookies
        RadiusApi.post('/vouchers/voucher-reset.json', reset, {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                    if (response.data.success) {
                        alert('Voucher reset successful')
                    } else {
                        alert(response.data.message)
                    }
                }
            )
        this.forceUpdate();
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
                <td>{item.name}</td>
                <td>{item.password}</td>
            </tr>
        ];

        if(this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.id}>
                    <td>
                        <span className='text-danger'>
                            <BiReset
                                aria-placeholder='reset'
                                onClick={() => this.onVoucherReset(item.id)}/>
                        </span>

                    </td>
                    <td>
                        <b>Group: </b>{item.realm}
                    </td>
                    <td>
                        <b>Profile: </b>{item.profile}
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
            <>
                <tbody>{allItemRows}</tbody>
                {/*--------------------Pagination------------------------*/}
                <tfoot>
                <tr>
                    <th colSpan={5}>
                        <div className="ui right floated pagination menu align-content-lg-end">
                            <Pagination
                                defaultActivePage={this.state.page}
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary
                                totalPages={this.onPagination()}
                                onPageChange={async (event, data) =>
                                    this.onPageChaneHandler(event, data)
                                }
                            />
                        </div>
                    </th>
                </tr>
                </tfoot>
            </>
        );
    }
}

export default VoucherApiMobile;
