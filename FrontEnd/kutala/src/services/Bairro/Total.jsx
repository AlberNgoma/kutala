import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export default async function Total() {
    return await axios.get(`${API}/total-bairros`)
}