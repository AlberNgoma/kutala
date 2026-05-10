import axios from "axios";
const API = "http://localhost:5000";

async function deleteGov(id){
    return await  axios.delete(`${API}/governador/${id}`);
}

export default deleteGov;