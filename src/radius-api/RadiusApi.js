import axios from "axios";

export default axios.create({
    baseURL: window.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    }
})
