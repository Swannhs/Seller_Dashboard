import axios from "axios";

export default axios.create({
    // baseURL: 'http://192.168.1.106/cake3/rd_cake/',
    baseURL: 'http://localhost:8765',
    headers: {'Content-Type': 'application/json'},
    // params: {
    //     node: 0,
    //     sel_language: '4_4'
    // }
})
