import axios from "axios";
const API = "http://localhost:5000"

async function buscarClima(bairro_id) {
    return await axios.get(`${API}/ultimo-clima/${bairro_id}`);
    
}

export default buscarClima;
