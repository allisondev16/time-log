import axios from "axios";

const instance = axios.create({
    baseURL: 'http://time-log-16-server.herokuapp.com/'
});

export default instance;