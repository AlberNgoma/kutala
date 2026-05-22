import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function TotalCidadao () {
    return axios.get(`${API}/total-cidadao`);
}

export default TotalCidadao;
