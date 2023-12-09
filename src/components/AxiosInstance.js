import axios from "axios";
import config from "./Config";

const AxiosInstance = axios.create({
    baseURL: ``,
    timeout: 30000,
});

export default AxiosInstance;