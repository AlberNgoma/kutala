import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function deleteAlert(id) {
    return await axios.delete(`${API}/alerta/${id}`)
}

export default deleteAlert;