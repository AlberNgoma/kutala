'use strict';
const bairros = require("../data/novosBairros-camama.json")
const hgt = require('node-hgt');
const path = require('path');


const tileset = new hgt.TileSet(path.join(__dirname, '../data'));

function calcularAltitude(lat, lng) {
  return new Promise(function (resolve, reject) {
    tileset.getElevation([lat, lng], function (err, elevation) {
      if (err) return reject(err);
      return resolve(elevation)
    })
  }
  )


}


function calcularVulnerabilidade(altitude) {
  const limite = 50;
  return altitude < limite ? "ALTA" : "BAIXA"
}

module.exports = {

  async up(queryInterface, Sequelize) {
    for (const bairro of bairros) {

      try {
        const altitudeCalculada = await calcularAltitude(bairro.latitude, bairro.longitude)
        const nivelVulnerabilidade = calcularVulnerabilidade(altitudeCalculada)

        const dados = [{
          nome: bairro.nome,
          latitude: bairro.latitude,
          longitude: bairro.longitude,
          poligono: JSON.stringify(bairro.poligono),
          vulnerabilidade: nivelVulnerabilidade,
          municipio_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }];


        await queryInterface.bulkInsert("bairro", dados);

      } catch (error) {
        console.log("Erro ao inserir bairros do camama ", error)
      }
    }

    console.log("DADOS INSERIDOS COM SUCESSO!")


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {});
  }
};