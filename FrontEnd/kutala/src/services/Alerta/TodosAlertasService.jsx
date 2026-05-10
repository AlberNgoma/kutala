import axios from "axios";
const API = "http://localhost:5000"

async function getAlerts(){
    return axios.get(`${API}/todos-alertas`);
}

export default getAlerts;