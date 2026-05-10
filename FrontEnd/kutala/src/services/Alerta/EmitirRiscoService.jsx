import axios from "axios";
const API = "http://localhost:5000";
const token = localStorage.getItem("token")

async function emitirRisco(id, nivel){
    return await axios.post(`${API}/alerta/risco-inundacao/${id}`, nivel, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
}
export default emitirRisco;