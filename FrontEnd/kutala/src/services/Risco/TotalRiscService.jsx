import axios from "axios";
const API = "http://localhost:5000";

async function TotalRisc() {
    return axios.get(`${API}/total-risco`);
    
}

export default TotalRisc;