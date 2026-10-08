const db = require("../models/index");
const { Op, NUMBER } = require("sequelize");
const bcrypt = require("bcrypt")


module.exports = {
    async criarCidadao(req, res) {
        const { nome, email, password, bairro_id, n_bi } = req.body;

        try {

            const senhaSegura = await bcrypt.hash(password, (10));

            const emailExistente = await db.perfil.findOne({ where: { email } });
            if (emailExistente) {
                return res.status(400).json("Email já registrado");
            }

            const n_biExistente = await db.cidadao.findOne({ where: { n_bi } });
            if (n_biExistente) {
                return res.status(400).json("BI já existente")
            }

            const novoPerfil = await db.perfil.create({
                nome: nome,
                email: email,
                password: senhaSegura,
                tipo: "CIDADAO"
            })

            const novoCidadao = await db.cidadao.create({
                bairro_id: bairro_id,
                n_bi: n_bi,
                perfil_id: novoPerfil.id
            })


            return res.status(201).json({
                mensagem: "Cidadão criado com sucesso.",
                perfil: novoPerfil,
                cidadao: novoCidadao
            });

        } catch (error) {
            return res.status(500).json("Erro ao criar cidadão")
        }
    },

    async listarCidadao(req, res) {
        try {
            const todosCidadaos = await db.cidadao.findAll({
                include: [
                    {
                        model: db.perfil, as: "perfil",
                        attributes: ['nome', 'email']
                    },

                    {
                        model: db.bairro, as: "bairro",
                        attributes: ['nome']
                    }
                ]
            });
            return res.status(200).json(todosCidadaos)

        } catch (error) {
            console.log("Erro ao listar cidadãos " + error)
        }
    },

    async listarCidadaoId(req, res) {
        const cidadao_id = req.params.id;
        try {
            const cidadao = await db.cidadao.findByPk(cidadao_id, {
                include: {
                    model: db.perfil, as: 'perfil',
                    attributes: ['nome', 'email']
                }
            });
            if (!cidadao) return res.status(404).json("Este cidadão não existe!")
            return res.status(200).json(cidadao);

        } catch (error) {
            console.log("Erro ao listar cidadão ", error)
            return res.status(500).json({ error: "Erro ao listar cidadão" })
        }
    },

    async actualizarCidadao(req, res) {
        const cidadao_id = req.params.id;
        const { nome, email, n_bi, bairro_id } = req.body;

        try {
            const cidadao = await db.cidadao.findByPk(cidadao_id);
            if (!cidadao) return res.status(404).json({ msg: "Este cidadão não existe" });

            const perfil_id = cidadao.perfil_id;

            const novoCidadao = await cidadao.update({
                n_bi: n_bi,
                bairro_id: bairro_id
            })

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
                msg: "Cidadão actualizado com sucesso!",
                novoCidadao,
                novoPerfil
            })

        } catch (error) {
            console.log("Erro ao actualizar cidadaão");
            return res.status(500).json({ error: "Erro ao actualizar cidadaão" })
        }
    },

    async apagarCidadao(req, res) {
        const cidadao_id = req.params.id;
        try {

            const cidadao = await db.cidadao.findByPk(cidadao_id);
            if (!cidadao) return res.status(404).json({ msg: "Este cidadão não existe" });

            const perfil_id = cidadao.perfil_id;

            await cidadao.destroy();
            await db.perfil.destroy({ where: { id: perfil_id } });

            return res.status(200).json({ msg: "Cidadão eliminado com sucesso !" })


        } catch (error) {
            console.log("Erro ao eliminar cidadão ", error);
            return res.status(500).json({ error: "Erro ao eliminar cidadã" })
        }
    },

    async totalCidadao(req, res) {
        try {

            const todosCidadaos = await db.cidadao.count();
            return res.status(200).json(todosCidadaos);



        } catch (error) {
            console.log("Erro ao calcular o total  de cidadãos!", error);
            return res.status(500).json({ error: "Erro ao calcular o total  de cidadãos!" })
        }
    },

    async filtrar(req, res) {

        const dia = NUMBER(req.query.dias).options;
        const hoje = new Date();
        const dataInicial = hoje.setDate(hoje.getDate() - dia);


        try {

            const cidadao = await db.cidadao.count({
                where: {
                    createdAt: {
                        [Op.lte]: dataInicial
                    }
                }
            })

            return res.status(200).json(cidadao)


        } catch (error) {
            console.log("Erro ao calcular cidadão cadastrado à 7 dias ", error.message)
        }
    }
}
