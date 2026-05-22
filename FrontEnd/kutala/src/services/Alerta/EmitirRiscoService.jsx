import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token")

async function emitirRisco(id, nivel){
    return await axios.post(`${API}/alerta/risco-inundacao/${id}`, nivel, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    });
}
export default emitirRisco;