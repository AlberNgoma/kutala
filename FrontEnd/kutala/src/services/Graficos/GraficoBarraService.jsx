import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getAlertaBairro(){
    return axios.get(`${API}/risco-municipio`);
}

export default getAlertaBairro;