const fs = require("fs");
const turf = require("@turf/turf");
const geoJSON = require("../data/Bairro_Maianga.json");

const bairroFiltrados = geoJSON.features.map(feature => {
    const nome = feature.properties.Nome_Bairr;
    const poligono = feature.geometry.coordinates;
    const centroPoligono = turf.centroid(feature);
    const longitude = centroPoligono.geometry.coordinates[0];
    const latitude = centroPoligono.geometry.coordinates[1];

    return {
        nome: nome,
        latitude: latitude,
        longitude: longitude,
        poligono: poligono
    }
})

fs.writeFileSync("../data/novosBairrosMaianga.json", JSON.stringify(bairroFiltrados, null, 2));
console.log("Bairros da Maianga filtrados com sucesso!")