import axios from "axios";
const API = "http://localhost:5000";

async function login(dados) {
    return axios.post(`${API}/login`, dados)
    
}

export default login;










