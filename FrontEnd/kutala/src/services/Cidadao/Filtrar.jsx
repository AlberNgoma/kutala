import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export default async function filtro(dia) {
    return axios.get(`${API}/filtro?dias=${dia}`) 
}