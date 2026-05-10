import axios from "axios";
const API = "http://localhost:5000";

async function getAlertaBairro(){
    return axios.get(`${API}/risco-municipio`);
}

export default getAlertaBairro;