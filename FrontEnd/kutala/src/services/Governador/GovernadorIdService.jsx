import axios from "axios";
const API = "http://localhost:5000";

async function cidadao(id) {
    return await axios.get(`${API}/governador/${id}`)
    
}

export default cidadao;