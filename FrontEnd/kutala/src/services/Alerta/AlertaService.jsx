import axios from "axios";
const API = "http://localhost:5000";

async function buscarAlerta(bairro_id) {
    return await axios.get(`${API}/alertas/${bairro_id}/bairro`);
    
}

export default buscarAlerta;