import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getAlerts(){
    return axios.get(`${API}/todos-alertas`);
}

export default getAlerts;