import axios from "axios";
const API = "http://localhost:5000"

async function deleteRisc(id) {
    axios.delete(`${API}/risco-inundacao/${id}`)
}

export default deleteRisc;