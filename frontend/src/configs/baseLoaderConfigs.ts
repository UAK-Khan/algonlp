import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.withCredentials = true;
