import axios from 'axios';


const apis = axios.create({
    baseURL: 'http://k02a3051.p.ssafy.io:7888/'
<<<<<<< HEAD
    // sujinURL: 'http://'
=======
    // baseURL:'http://192.168.1.242:7888/'
>>>>>>> 24db763626662ffd1db058e5a81f17fa685981db
});

apis.defaults.headers.common['Content-Type'] = 'application/json'

export default apis;