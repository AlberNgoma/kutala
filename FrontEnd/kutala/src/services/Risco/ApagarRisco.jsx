import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function deleteRisc(id) {
    axios.delete(`${API}/risco-inundacao/${id}`)
}

export default deleteRisc;