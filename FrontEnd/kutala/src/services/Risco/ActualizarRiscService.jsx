import axios from "axios";
const API = "http://localhost:5000"

async function updateRisc(id, dados) {
    return axios.put(`${API}/risco-inundacao/${id}`, dados)
    
}

export default updateRisc;