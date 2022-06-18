import axios from "axios";

axios.defaults.baseURL = 'http://192.168.0.108:5000';

(window as any).axios = axios;

export default axios;