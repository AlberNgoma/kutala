const fs = require("fs");
const turf = require("@turf/turf");

const geoJSON = require("../data/Bairro_K.Kiaxi.json");

const bairrosFiltrados = geoJSON.features.map(feature=>{
    const nomeBairro = feature.properties.Nome_Bairr;
    const poligono = feature.geometry.coordinates;
    const centroPoligono = turf.centroid(feature);
    const longitude = centroPoligono.geometry.coordinates[0];
    const latitude = centroPoligono.geometry.coordinates[1];

    return {
        nome : nomeBairro,
        poligono : poligono,
        latitude : latitude,
        longitude : longitude
    }
})

fs.writeFileSync("../data/novosBairrosKK.json", JSON.stringify(bairrosFiltrados, null, 2));
console.log("Bairros do KK filtrados com sucesso!");