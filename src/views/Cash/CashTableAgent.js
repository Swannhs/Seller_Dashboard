import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";
import RadiusApi from "../../radius-api/RadiusApi";

class CashTableAgent extends Component {
    state = {
        cash: []
    }
    componentDidMount() {
        const cookie = new Cookies();
        RadiusApi.get('/balance-transaction-details/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })
            .then(response => {
                this.setState({
                    cash: response.data.items
                })
            })
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default CashTableAgent;
