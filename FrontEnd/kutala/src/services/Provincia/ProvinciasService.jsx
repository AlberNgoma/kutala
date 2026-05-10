import axios from "axios";
const API = "http://localhost:5000";

async function getProvincia() {
    return await axios.get(`${API}/provincias`);
}

export default getProvincia;