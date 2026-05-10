import axios from "axios";

const API = "http://localhost:5000";


async function listarComentarios(bairro_id) {
    return await axios.get(`${API}/comentario/${bairro_id}/bairro`);
}



export default listarComentarios;
    

