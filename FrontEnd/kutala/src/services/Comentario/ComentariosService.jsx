import axios from "axios";

const API = import.meta.env.VITE_API_URL;


async function listarComentarios(bairro_id) {
    return await axios.get(`${API}/comentario/${bairro_id}/bairro`);
}



export default listarComentarios;
    

