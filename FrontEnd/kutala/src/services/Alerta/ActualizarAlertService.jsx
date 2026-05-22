import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function updateAlert(id, dados) {
    return axios.put(`${API}/alerta/${id}`, dados)
    
}

export default updateAlert;