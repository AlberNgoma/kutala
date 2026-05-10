import axios from "axios";
const API = "http://localhost:5000";

async function actualizarGov(id, dados) {
    return await axios.put(`${API}/actualizar-gov/${id}`, dados)
  
}

export default actualizarGov;