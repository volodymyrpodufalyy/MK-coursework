import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

(window as any).axios = axios;

export default axios;