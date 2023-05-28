import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

export { axios };