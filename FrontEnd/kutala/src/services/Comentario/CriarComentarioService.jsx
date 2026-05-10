import axios from "axios";
const API = "http://localhost:5000";
const token = localStorage.getItem("token")


async function criarComentario(data) {
    const token = localStorage.getItem("token"); // ✅ lê SEMPRE o token atual

    return await axios.post(`${API}/comentario`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    });
}

export default criarComentario;