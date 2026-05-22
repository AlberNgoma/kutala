import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function riscoId(id) {
    return axios.get(`${API}/risco-inundacao/${id}`)
    
}

export default riscoId;