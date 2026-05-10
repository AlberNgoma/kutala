import axios from "axios";
const API = "http://localhost:5000";

async function getMunicipio(id){
    return await axios.get(`${API}/provincias/${id}/municipios`)
}

export default getMunicipio;