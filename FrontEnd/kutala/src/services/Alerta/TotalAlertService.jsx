import axios from "axios";
const API = "http://localhost:5000";

async function TotalAlerta() {
    return axios.get(`${API}/total-alerta`);
}

export default TotalAlerta;