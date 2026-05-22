import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function actualizarGov(id, dados) {
    return await axios.put(`${API}/actualizar-gov/${id}`, dados)
  
}

export default actualizarGov;