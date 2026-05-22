import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getCidadao() {
    return axios.get(`${API}/listar-cidadao`);
}

export default getCidadao;