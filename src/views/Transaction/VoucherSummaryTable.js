import React, {Component} from 'react';
import RadiusApi from "../../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

class VoucherSummaryTable extends Component {
    state = {
        summary: []
    }

    componentDidMount() {
        let cookie = new Cookies
        RadiusApi.get('/voucher-transactions/summary.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                // console.log(response)
            })
    }

    render() {
        return (
            <div>
                Agent
            </div>
        );
    }
}

export default VoucherSummaryTable;
