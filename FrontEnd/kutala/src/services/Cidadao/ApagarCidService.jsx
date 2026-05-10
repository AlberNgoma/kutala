import axios from "axios";
const API = "http://localhost:5000";

async function deleteCid(id) {
    return axios.delete(`${API}/apagar-cidadao/${id}`)
}

export default deleteCid;