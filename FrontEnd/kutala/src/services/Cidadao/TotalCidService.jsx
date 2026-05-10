import axios from "axios";
const API = "http://localhost:5000";

async function TotalCidadao () {
    return axios.get(`${API}/total-cidadao`);
}

export default TotalCidadao;
