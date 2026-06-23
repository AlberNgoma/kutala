import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function recuperConta(dados) {
    return axios.post(`${API}/recuperar-conta`, { email: dados })

}

export default recuperConta;