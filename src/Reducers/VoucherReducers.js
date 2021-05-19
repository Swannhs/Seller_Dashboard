import {VOUCHERS_LIST_FAIL, VOUCHERS_LIST_REQUEST, VOUCHERS_LIST_SUCCESS} from "../constants/VoucherConstants";

const VoucherReducers = (state = {vouchers: []}, action) => {
    switch (action.type) {
        case VOUCHERS_LIST_REQUEST:
            return {
                loading: true,
                vouchers: []
            }
        case VOUCHERS_LIST_SUCCESS:
            return {
                loading: false,
                vouchers: action.payload
            }
        case VOUCHERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default VoucherReducers;
