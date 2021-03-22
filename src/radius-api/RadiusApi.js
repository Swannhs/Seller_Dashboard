import axios from "axios";

export default axios.create({
    // baseURL: 'http://192.168.1.113/cake3/rd_cake/', // Online
    baseURL: 'http://localhost:8765',
    headers: {'Content-Type': 'application/json'},
    // params: {
    //     node: 0,
    //     sel_language: '4_4'
    // }
})
