import axios from "axios";
const API = "http://localhost:5000";

async function getAlertaNivel(){
    return axios.get(`${API}/alerta-nivel`);
}

export default getAlertaNivel;