import axios from "axios";
const API = "http://localhost:5000"

async function deleteAlert(id) {
    return await axios.delete(`${API}/alerta/${id}`)
}

export default deleteAlert;