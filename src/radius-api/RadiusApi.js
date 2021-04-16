import axios from "axios";

export default axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    // baseURL: 'http://localhost:8765',
    // baseURL: process.env.ADMIN_BACKEND_BASE_URL,
    headers: {'Content-Type': 'application/json'},
    // params: {
    //     node: 0,
    //     sel_language: '4_4'
    // }
})
