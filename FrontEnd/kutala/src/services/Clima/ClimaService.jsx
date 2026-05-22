import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function buscarClima(bairro_id) {
    return await axios.get(`${API}/ultimo-clima/${bairro_id}`);
    
}

export default buscarClima;
