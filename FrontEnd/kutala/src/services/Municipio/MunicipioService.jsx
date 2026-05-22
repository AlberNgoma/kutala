import axios from "axios";
const API = import.meta.env.VITE_API_URL;

async function getMunicipio(id){
    return await axios.get(`${API}/provincias/${id}/municipios`)
}

export default getMunicipio;