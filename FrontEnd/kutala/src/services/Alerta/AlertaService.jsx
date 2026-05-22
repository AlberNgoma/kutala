import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function buscarAlerta(bairro_id) {
    return await axios.get(`${API}/alertas/${bairro_id}/bairro`);
    
}

export default buscarAlerta;