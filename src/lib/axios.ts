import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.validateStatus = () => true;

export { axios };