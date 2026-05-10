const db = require("../models/index");
const { sequelize } = require("../models")

module.exports = {
    async criarRiscoInundacao(req, res) {
        const { nivel, descricao, bairro_id, municipio_id } = req.body;
        const perfil_id = req.perfil.id;

        try {
            const novoRiscoInundacao = await db.risco_inundacao.create({
                nivel: nivel,
                descricao: descricao,
                bairro_id: bairro_id,
                municipio_id: municipio_id,
                perfil_id: perfil_id
            })

            return res.status(201).json(novoRiscoInundacao);




        } catch (error) {
            console.log("Erro ao criar risco ", error)
        }
    },

    async listarRisco(req, res) {
        const bairro_id = req.params.id;

        try {

            const todosRiscos = await db.risco_inundacao.findAll({
                where: {
                    bairro_id

                },

                include: {
                    model: db.perfil, as: 'perfil',
                    attributes: ['nome', 'email']
                }

            })

            return res.status(200).json(todosRiscos);





        } catch (error) {
            console.log("Erro ao listar riscos")
        }
    },

    async listarTodosRiscos(req, res) {
        try {
            const todosRiscos = await db.risco_inundacao.findAll({
                include: [
                    {
                        model: db.bairro, as: 'bairro',
                        attributes: ['nome']
                    },

                    {
                        model: db.municipio, as: 'municipio',
                        attributes: ['nome']
                    },

                    {
                        model: db.perfil, as: 'perfil',
                        attributes: ['nome']
                    }
                ]
            })

            return res.status(200).json(todosRiscos)

        } catch (error) {
            console.log("Erro ao listar todos riscos ", error);
            return res.status(500).json({ error: "Erro ao listar todos os riscos" })
        }
    },

    async listarRiscoId(req, res) {
        const risco_inundacaoId = req.params.id;
        try {
            const risco = await db.risco_inundacao.findByPk(risco_inundacaoId, {
                include: [
                    {
                        model: db.bairro, as: 'bairro',
                        attributes: ['nome']
                    },

                    {
                        model: db.perfil, as: 'perfil',
                        attributes: ['nome']
                    }
                ]
            })

            if (!risco) return res.status(404).json("Este risco não existe")
            return res.status(200).json(risco)


        } catch (error) {
            console.log("Erro ao listar riscos ", error);
            return res.status(500).json({ error: "Erro ao listar riscos" })
        }
    },


    async atualizarRisco(req, res) {
        const risco_inundacaoId = req.params.id;
        const { nivel, descricao, bairro_id } = req.body;

        try {

            const risco_inundacao = await db.risco_inundacao.findByPk(risco_inundacaoId);
            if (!risco_inundacao) return res.status(404).json({ msg: "Este risco de inundação não existe!" });
            await risco_inundacao.update({
                nivel: nivel,
                descricao: descricao,
                bairro_id: bairro_id
            })

            return res.status(200).json({ msg: "Risco de alerta actualizado com sucesso!" })







        } catch (error) {
            console.log("Erro ao actualizar risco de inundação ", error)
            return res.status(500).json({ error: "Erro ao actualizar risco de inundação" })
        }
    },

    async deletarRisco(req, res) {
        const risco_inundacaoId = req.params.id;
        try {
            const risco_inundacao = await db.risco_inundacao.findByPk(risco_inundacaoId);
            if (!risco_inundacao) return res.status(404).json({ msg: "Este risco de inundação não existe!" });

            await risco_inundacao.destroy();
            return res.status(200).json({ msg: "Risco de inundação deletado com sucesso!" });



        } catch (error) {
            console.log("Erro ao deletar risco de inundação ", error);
            return res.status(500).json({ error: "Erro ao deletar risco de inundação " })
        }
    },

    async totalRisco(req, res) {
        try {

            const todosRiscos = await db.risco_inundacao.count();

            return res.status(200).json(todosRiscos);


        } catch (error) {
            console.log("Erro ao calcular total de riscos ", error);
            return res.status(500).json({ error: "Erro ao calcular total de riscos" })
        }
    },

    async riscoPorBairro(req, res) {
        try {

            const getRisc = await db.risco_inundacao.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('risco_inundacao.id')), 'total_de_riscos']
                ],

                include: {
                    model: db.bairro, as: "bairro",
                    attributes: ['nome']
                },

                group: ['bairro.id', 'bairro.nome']
            })
            return res.status(200).json(getRisc);

        } catch (error) {
            console.log("Erro ao buscar riscos por bairro ", error);
            return res.status(500).json({ error: "Erro ao buscar riscos por bairro" })
        }
    },

    async riscoPorMunicipio(req, res) {
        try {

            const getRisc = await db.risco_inundacao.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('risco_inundacao.id')), 'total_de_riscos']
                ],

                include: {
                    model: db.municipio, as: "municipio",
                    attributes: ['nome']
                },

                group: ['municipio.id', 'municipio.nome']
            })
            return res.status(200).json(getRisc);

        } catch (error) {
            console.log("Erro ao buscar riscos por bairro ", error);
            return res.status(500).json({ error: "Erro ao buscar riscos por bairro" })
        }
    }
}