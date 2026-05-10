import axios from "axios";
const API = "http://localhost:5000";

async function TotalGovernador() {
    return await axios.get(`${API}/total-governador`);
}

export default TotalGovernador;