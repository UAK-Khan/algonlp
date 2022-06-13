import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API; // "http://localhost:3001/api";
axios.defaults.withCredentials = true;
