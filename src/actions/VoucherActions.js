import {VOUCHERS_LIST_FAIL, VOUCHERS_LIST_REQUEST, VOUCHERS_LIST_SUCCESS} from "../constants/VoucherConstants";
import RadiusApi from "../radius-api/RadiusApi";
import Cookies from "universal-cookie/lib";

export const listVouchers = () => async (dispatch) => {
    let cookie = new Cookies;
    try {
        dispatch({type: VOUCHERS_LIST_REQUEST})

        const {data} = await RadiusApi.get('/vouchers/index.json', {
            params: {
                token: cookie.get('Token')
            }
        })

        dispatch({
            type: VOUCHERS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: VOUCHERS_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.message.data.message : error.message
        })
    }
}
