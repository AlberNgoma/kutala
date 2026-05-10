const db = require("../models/index");
const bcrypt = require("bcrypt");


module.exports = {
    async criarGovernador(req, res) {
        const { nome, email, cargo, provincia_id } = req.body;

        try {

            const emailExistente = await db.perfil.findOne({ where: { email } });
            if (emailExistente) {
                return res.status(401).json("Este email ja existe")
            };


            const novoPerfil = await db.perfil.create({
                nome: nome,
                email: email,
                password: await bcrypt.hash("teste", 10),
                tipo: "GOVERNADOR"
            })

            const perfil_id = novoPerfil.id

            const novoGovernador = await db.governador.create({
                cargo: cargo,
                perfil_id: perfil_id,
                provincia_id: provincia_id

            })

            return res.status(201).json({
                mensagem: "Governador criado com sucesso",
                perfil: novoPerfil,
                governador: novoGovernador
            })







        } catch (error) {
            res.status(500).json("Erro ao criar Governado", error)
        }
    },

    async listarGovernador(req, res) {
        try {

            const Governadores = await db.governador.findAll({
                include: [
                    {
                        model: db.perfil, as: 'perfil',
                        attributes: ['nome', 'email']
                    },

                    {
                        model: db.provincia, as: 'provincia',
                        attributes: ['nome']
                    }
                ]
            })

            return res.status(200).json(Governadores)






        } catch (error) {
            res.status(500).json("Erro ao listar governadores ", error)
        }
    },

    async listarGovId(req, res) {
        const id = req.params.id;
        try {
            const governador = await db.governador.findByPk(id, {
                include: [
                    {
                        model: db.perfil, as: 'perfil',
                        attributes: ['nome', 'email']
                    },

                    {
                        model: db.provincia, as: 'provincia',
                        attributes: ['nome']
                    }
                ]
            });
            if (!governador) return res.status(404).json({ msg: "Este governador não existe" })

            return res.status(200).json(governador)

        } catch (error) {
            console.log("Erro ao listar governador ", error)
        }

    },

    async apagarGov(req, res) {
        const governador_id = req.params.id;
        try {

            const governador = await db.governador.findByPk(governador_id);
            if (!governador) return res.status(404).json({ msg: "Govenador não existe!" });

            const perfil_id = governador.perfil_id;
            await governador.destroy();
            await db.perfil.destroy({ where: { id: perfil_id } });

            return res.status(200).json({ msg: "Governador eliminado com sucesso!" })


        } catch (error) {
            console.log("Erro ao eliminar governador ", error)
            return res.status(500).json({ error: "Erro ao eliminar governador!" })
        }
    },

    async actualizarGov(req, res) {
        const governador_id = req.params.id;
        const { nome, email, cargo, provincia_id } = req.body;

        try {

            const governador = await db.governador.findByPk(governador_id);
            if (!governador) return res.status(404).json({ msg: "Este governador não existe" });

            const perfil_id = governador.perfil_id;

            const novoGovernador = await governador.update({
                cargo: cargo,
                perfil_id: perfil_id,
                provincia_id: provincia_id
            });
            const novoPerfil = await db.perfil.update(
                {
                    nome: nome,
                    email: email
                },
                {
                    where: { id: perfil_id }
                }
            )


            return res.status(200).json({
                msg: "Governador actualizado com sucesso!",
                novoGovernador,
                novoPerfil
            });



        } catch (error) {
            console.log("Erro ao actualizar governador ", error)
            return res.status(500).json({ error: "Erro ao actualizar governador" })
        }
    },

    async totalGov(req, res) {
        try {
            const todosGovernadores = await db.governador.count();
            return res.status(200).json(todosGovernadores)



        } catch (error) {
            console.log("Erro ao calcuar total de govenadores");
            return res.status(500).json({ error: "Erro ao calcular total de governadores" })
        }
    }
}