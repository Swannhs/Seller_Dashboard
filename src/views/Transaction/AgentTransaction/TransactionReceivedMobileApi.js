import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../../radius-api/RadiusApi";
import TransactionReceivedMobile from "./TransactionReceivedMobile";

class TransactionReceivedMobileApi extends Component {
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
                    transactions: response.data.received,
                    loading: false
                })
            })
    }

    render() {
        return (
            <>
                {
                    this.state.loading ? <div className="ui active centered inline loader mt-5"/> :
                        <>
                            {
                                this.state.transactions[0] ? <TransactionReceivedMobile data={this.state.transactions}/>:
                                    <h3 className='text-danger text-center'>No received history is found</h3>
                            }

                        </>
                }
            </>
        );
    }
}

export default TransactionReceivedMobileApi;
