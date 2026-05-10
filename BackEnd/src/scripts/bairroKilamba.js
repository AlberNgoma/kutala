const fs = require("fs");
const turf = require("@turf/turf");

const geoJson = require("../data/Bairros_Kilamba.json");

const bairrosFiltrados = geoJson.features.map(feature=>{
    const nomeBairro = feature.properties.Nome_Bairr;
    const poligono = feature.geometry.coordinates;
    const centroPoligono = turf.centroid(feature);
    const longitude = centroPoligono.geometry.coordinates[0];
    const latitude = centroPoligono.geometry.coordinates[1];

    return {
        nome : nomeBairro,
        latitude : latitude,
        longitude : longitude,
        poligono : poligono
    }
})

fs.writeFileSync("../data/novosBairros-kilamba.json", JSON.stringify(bairrosFiltrados, null, 2));
console.log("Bairros do Kilamba filtrados com sucesso");