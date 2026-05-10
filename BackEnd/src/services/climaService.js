const axios = require("axios");
const API_KEY = process.env.OPENWEATHER_KEY;

async function obterClima(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt`;

    const resposta = await axios.get(url);

    return resposta.data
}



module.exports = {obterClima}