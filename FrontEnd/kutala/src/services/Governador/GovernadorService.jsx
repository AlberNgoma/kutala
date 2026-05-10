import axios from "axios";
const API = "http://localhost:5000";

async function getGov() {
    return await axios.get(`${API}/governador`)
}

export default getGov;