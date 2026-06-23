import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function login(dados) {
    return axios.post(`${API}/login`, dados)
    
}

export default login;