import axios from "axios";
export const BASE_URL = "http://192.168.2.54:8000";

export default axios.create({
    baseURL: BASE_URL + "/api",
})