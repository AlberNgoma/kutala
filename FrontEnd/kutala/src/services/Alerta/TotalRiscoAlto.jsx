import axios from "axios";
const API = import.meta.env.VITE_API_URL;


export default function TotalNivelAlto(){
    return axios.get(`${API}/nivel-alerta`)
}