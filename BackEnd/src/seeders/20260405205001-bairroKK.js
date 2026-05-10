'use strict';
const bairroKK = require("../data/novosBairrosKK.json");

module.exports = {
    async up(queryInterface, Sequelize){
        try {
            
            const dados = bairroKK.map(bairro=>({
                nome : bairro.nome,
                latitude : bairro.latitude,
                longitude : bairro.longitude,
                poligono : JSON.stringify(bairro.poligono),
                municipio_id : 2,
                createdAt : new Date(),
                updatedAt : new Date()
            }))

            await queryInterface.bulkInsert('bairro', dados);
            console.log("Bairros do município do KK inseridos com sucesso!");

            
        } catch (error) {
            console.log("Erro ao adicionar bairros do KK ", error);
        }

    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete('bairro', null, {})

    }
};