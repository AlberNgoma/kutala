import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getRisc(){
    return axios.get(`${API}/risco-inundacao`)
}

export default getRisc;