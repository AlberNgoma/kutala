import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getProvincia() {
    return await axios.get(`${API}/provincias`);
}

export default getProvincia;