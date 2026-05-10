import axios from "axios";
const API = "http://localhost:5000";

async function getCidadao() {
    return axios.get(`${API}/listar-cidadao`);
}

export default getCidadao;