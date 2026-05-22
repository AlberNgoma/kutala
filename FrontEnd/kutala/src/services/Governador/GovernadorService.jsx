import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getGov() {
    return await axios.get(`${API}/governador`)
}

export default getGov;