import axios from "axios";
const API = "http://localhost:5000"


async function buscarBairros() {
    return await axios.get(`${API}/bairros`);
}

export default buscarBairros;