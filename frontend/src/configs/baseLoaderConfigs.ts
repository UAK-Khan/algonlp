import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_DOMAIN}/api`;
axios.defaults.withCredentials = true;
