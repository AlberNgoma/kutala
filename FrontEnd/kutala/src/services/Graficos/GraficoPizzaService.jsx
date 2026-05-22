import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getAlertaNivel(){
    return axios.get(`${API}/alerta-nivel`);
}

export default getAlertaNivel;