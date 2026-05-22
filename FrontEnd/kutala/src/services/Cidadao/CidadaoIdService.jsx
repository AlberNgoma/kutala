import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getCidId(id) {
    return axios.get(`${API}/listar-cidadao/${id}`)
}

export default getCidId;