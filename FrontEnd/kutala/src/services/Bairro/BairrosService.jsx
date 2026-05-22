import axios from "axios";
const API = import.meta.env.VITE_API_URL;


async function buscarBairros() {
    return await axios.get(`${API}/bairros`);
}

export default buscarBairros;