import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token")


async function criarComentario(data) {
    const token = localStorage.getItem("token");

    return await axios.post(`${API}/comentario`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    });
}

export default criarComentario;