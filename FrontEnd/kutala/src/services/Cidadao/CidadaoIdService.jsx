import axios from "axios";
const API = "http://localhost:5000";

async function getCidId(id) {
    return axios.get(`${API}/listar-cidadao/${id}`)
}

export default getCidId;