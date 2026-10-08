import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getAlertaBairro(){
    return axios.get(`${API}/alerta-municipio`);
}

export default getAlertaBairro;