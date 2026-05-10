import axios from "axios";
const API = "http://localhost:5000";

async function cadastrar(dados){
    return axios.post(`${API}/cadastrar-cidadao`, dados)
}

export default cadastrar;
