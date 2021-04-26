import axios from "axios";

export default axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {'Content-Type': 'application/json'},
    // params: {
    //     node: 0,
    //     sel_language: '4_4'
    // }
})
