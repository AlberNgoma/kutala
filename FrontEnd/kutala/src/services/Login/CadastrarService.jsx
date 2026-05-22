import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function cadastrar(dados){
    return axios.post(`${API}/cadastrar-cidadao`, dados)
}

export default cadastrar;
