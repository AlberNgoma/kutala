import axios from "axios";
const API = "http://localhost:5000";

async function getAlertaData(){
    return axios.get(`${API}/alerta-data`);
}

export default getAlertaData;