import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getAlertaData(){
    return axios.get(`${API}/alerta-data`);
}

export default getAlertaData;