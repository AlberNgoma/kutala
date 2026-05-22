import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function deleteCid(id) {
    return axios.delete(`${API}/apagar-cidadao/${id}`)
}

export default deleteCid;