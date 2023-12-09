import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: `https://api.ai.barku.re`,
    timeout: 30000,
});

export default AxiosInstance;