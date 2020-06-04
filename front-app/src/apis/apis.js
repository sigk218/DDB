import axios from 'axios';


const apis = axios.create({
    baseURL: 'http://192.168.1.108:7888/',
});


export default apis;