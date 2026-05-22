import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function deleteGov(id){
    return await  axios.delete(`${API}/governador/${id}`);
}

export default deleteGov;