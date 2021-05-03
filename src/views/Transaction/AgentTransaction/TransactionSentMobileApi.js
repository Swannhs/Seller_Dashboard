import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import TransactionSentMobile from "./TransactionSentMobile";

class TransactionSentMobileApi extends Component {
    state = {
        transactions: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true})
        const cookie = new Cookies();

        RadiusApi.get('/voucher-transactions/view.json', {
            params: {
                token: cookie.get('Token'),
                key: this.props.id
            }
        })
            .then(response => {
                this.setState({
                    transactions: response.data.send,
                    loading: false
                })
            })
    }

    render() {
        return (
            <>
                {
                    this.state.loading ? <div className="ui active centered inline loader mt-5"/> :
                        <TransactionSentMobile data={this.state.transactions}/>
                }
            </>
        );
    }

}

export default TransactionSentMobileApi;
