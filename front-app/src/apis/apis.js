import axios from 'axios';


const apis = axios.create({
    baseURL: '192.168.1.91:7888/',
});


export default apis;