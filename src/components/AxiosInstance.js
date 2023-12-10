import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: `/api/proxy/`,
    timeout: 30000,
});

export default AxiosInstance;