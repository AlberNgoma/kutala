import axios from "axios";
const API = "http://localhost:5000"

async function getRisc(){
    return axios.get(`${API}/risco-inundacao`)
}

export default getRisc;