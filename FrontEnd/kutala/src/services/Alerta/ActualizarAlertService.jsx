import axios from "axios";
const API = "http://localhost:5000"

async function updateAlert(id, dados) {
    return axios.put(`${API}/alerta/${id}`, dados)
    
}

export default updateAlert;