import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function updateRisc(id, dados) {
    return axios.put(`${API}/risco-inundacao/${id}`, dados)
    
}

export default updateRisc;