import axios from "axios";
const API = "http://localhost:5000";

async function getAlertId(id) {
    return axios.get(`${API}/todos-alertas/${id}`)
}

export default getAlertId;