require('dotenv').config({ path: '../.env' });
const { TileSet } = require("node-hgt");
const table = require("./models/index.js");

async function teste() {
    try {
        const bairros = await table.bairro.findAll();

        const tiles = new TileSet("./data", { localOnly: true });

        const calcularVulnerabilidade = (altura) => {
            const alturaMinima = 40;
            if (altura > alturaMinima) return "BAIXA"
            if (altura < alturaMinima) return "ALTA"

        };

        for (const bairro of bairros) {

            tiles.getElevation([bairro.latitude, bairro.longitude], (erro, altitude) => {
                if (erro) {
                    return console.log(`Erro ao calcular altura do bairro ${bairro.nome}:`, erro.message);
                }

                console.log(`Bairro : ${bairro.nome} | Vulnerabilidade : ${calcularVulnerabilidade(altitude)}`)
            });
        }
    } catch (error) {
        console.error("Erro ao buscar bairros:", error);
    }
}

teste();
