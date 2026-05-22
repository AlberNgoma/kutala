import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getAlertId(id) {
    return axios.get(`${API}/todos-alertas/${id}`)
}

export default getAlertId;