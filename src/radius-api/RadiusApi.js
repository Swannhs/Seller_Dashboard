import axios from "axios";

export default axios.create({
    baseURL: 'http://192.168.0.105:8180/cake3/rd_cake/',
    // baseURL: 'http://localhost:8765',
    // baseURL: process.env.ADMIN_BACKEND_BASE_URL,
    headers: {'Content-Type': 'application/json'},
    // params: {
    //     node: 0,
    //     sel_language: '4_4'
    // }
})
