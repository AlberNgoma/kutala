import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function cidadao(id) {
    return await axios.get(`${API}/governador/${id}`)
    
}

export default cidadao;