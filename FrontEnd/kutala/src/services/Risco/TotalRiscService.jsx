import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function TotalRisc() {
    return axios.get(`${API}/total-risco`);
    
}

export default TotalRisc;