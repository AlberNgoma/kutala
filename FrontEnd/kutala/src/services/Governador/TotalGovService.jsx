import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function TotalGovernador() {
    return await axios.get(`${API}/total-governador`);
}

export default TotalGovernador;