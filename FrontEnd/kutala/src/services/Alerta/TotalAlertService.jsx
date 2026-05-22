import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function TotalAlerta() {
    return axios.get(`${API}/total-alerta`);
}

export default TotalAlerta;