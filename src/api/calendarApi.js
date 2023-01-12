import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const {VITE_API_URL} = getEnvVariables();


const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

calendarApi.interceptors.request.use(config=> {

    const token = JSON.parse(localStorage.getItem("token"))

    config.headers ={
        ...config.headers,
        authorization: `Bearer ${token?.accessToken}`
    }

    return config
})
export default calendarApi;