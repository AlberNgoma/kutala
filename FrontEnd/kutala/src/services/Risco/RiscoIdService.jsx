import axios from "axios";
const API = "http://localhost:5000"

async function riscoId(id) {
    return axios.get(`${API}/risco-inundacao/${id}`)
    
}

export default riscoId;