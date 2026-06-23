import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export default async function Reset(token, dados){
    return axios.put(`${API}/redefinir-senha/${token}`, {password : dados})
}