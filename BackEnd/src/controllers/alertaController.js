const db = require("../models/index");
const { sequelize } = require("../models");
const { sendEmail } = require("../services/emailService");
const gerarEmail = require("../templates/gerarEmail");


module.exports = {

    async criarAlerta(req, res) {
        const perfil_id = req.perfil.id;
        const { titulo, mensagem, nivel_alerta, bairro_id } = req.body;

        try {
            const novoAlerta = await db.alerta.create({
                titulo: titulo,
                mensagem: mensagem,
                nivel_alerta: nivel_alerta,
                perfil_id: perfil_id,
                bairro_id: bairro_id
            })

            return res.status(201).json(novoAlerta)


        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar alertas" })
        }

    },

    async listarAlertas(req, res) {
        const bairro_id = req.params.id;
        try {

            const alertas = await db.alerta.findAll({
                where: {
                    bairro_id
                },

                include: [

                    {
                        model: db.bairro, as: "bairro",
                        attributes: ['nome']
                    },

                    {
                        model: db.perfil, as: "perfil",
                        attributes: ['nome']
                    }
                ]
            })

            return res.status(200).json(alertas);




        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar alertas" })
        }
    },

    async listarAlertId(req, res) {
        const id = req.params.id;
        try {
            const alerta = await db.alerta.findByPk(id, {
                include: [
                    {
                        model: db.perfil, as: 'perfil',
                        attributes: ['nome', 'email']
                    },

                    {
                        model: db.bairro, as: 'bairro',
                        attributes: ['nome']
                    }
                ]
            });
            if (!alerta) return res.status(404).json({ msg: "Este alerta não existe" })

            return res.status(200).json(alerta)

        } catch (error) {
            console.log("Erro ao listar alerta ", error)
        }

    },

    async listarTodosAlertas(req, res) {
        try {

            const todosAlertas = await db.alerta.findAll({
                include: [
                    {
                        model: db.bairro, as: 'bairro',
                        attributes: ['nome', 'nivel_risco']
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
            });
            return res.status(200).json(todosAlertas);


        } catch (error) {
            console.log("Erro ao listar todos os alertas");
            return res.status(500).json({ error: "Erro ao listar todos os alertas" })
        }
    },

    async actualizarAlerta(req, res) {
        const alerta_id = req.params.id;
        const { titulo, mensagem, nivel_alerta, bairro_id } = req.body;
        try {
            const alerta = await db.alerta.findByPk(alerta_id);
            if (!alerta) return res.status(404).json({ msg: "Este alerta não existe !" });

            await alerta.update({
                titulo: titulo,
                mensagem: mensagem,
                nivel_alerta: nivel_alerta,
                bairro_id: bairro_id
            })

            return res.status(200).json({ msg: "Alarta actualizado com sucesso !" })


        } catch (error) {
            console.log("Erro ao actualizar alerta ", error);
            return res.status(500).json({ error: "Erro ao actualizar Alerta" })
        }
    },
    async totalAlerta(req, res) {
        try {
            const todosAlertas = await db.alerta.count();
            return res.status(200).json(todosAlertas)


        } catch (error) {
            console.log("Erro ao calcular total de alertas ", error);
            return res.status(500).json({ error: "Erro ao calcular total de alertas" })
        }
    },

    async deletarAlerta(req, res) {
        const alerta_id = req.params.id;

        try {
            const alerta = await db.alerta.findByPk(alerta_id);
            if (!alerta) return res.status(404).json({ msg: "Este alerta não existe" });

            await alerta.destroy();
            return res.status(200).json({ msg: "Alerta deletado com sucesso!" })



        } catch (error) {
            console.log("Erro ao deletar alerta ", error);
            return res.status(500).json({ error: "Erro ao deletar alerta" });
        }
    },

    async todalAlertaMunicipio(req, res) {
        const municipio_id = req.params.id;
        try {
            const totalAlerta = await db.alerta.count({ where: { id: municipio_id } });
            return res.status(200).json(totalAlerta);



        } catch (error) {
            console.log("Erro ao calcular todal de alerta por município ", error);
            return res.status(500).json({ error: "Erro ao calcular todal de alerta por município" })
        }
    },

    async alertaPorBairro(req, res) {
        try {
            const getAlerta = await db.alerta.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('alerta.id')), 'Total_de_Alertas']
                ],

                include: {
                    model: db.bairro, as: 'bairro',
                    attributes: ['nome']
                },

                group: ['bairro.id', 'bairro.nome']
            })

            return res.status(200).json(getAlerta);

        } catch (error) {
            console.log("Erro ao ir buscar alertas por bairros ", error);
            return res.status(500).json({ error: "Erro ao ir buscar alerta por bairros" })
        }
    },

    async alertaPorData(req, res) {

        try {
            const getAlertaDate = await db.alerta.findAll({
                attributes: [
                    [sequelize.fn('DATE', sequelize.col('alerta.createdAt')), 'data'],
                    [sequelize.fn('COUNT', sequelize.col('alerta.id')), 'total_de_alertas']
                ],

                group: [sequelize.fn('DATE', sequelize.col('alerta.createdAt')), 'data']
            })

            return res.status(200).json(getAlertaDate);




        } catch (error) {
            console.log("Erro ao ir buscar alerta pela data ", error)
            return res.status(500).json({ error: "Erro ao ir buscar alerta pela data" });
        }
    },

    async alertaPorNivel(req, res) {
        try {

            const getAlertaNivel = await db.alerta.findAll({
                attributes: [
                    'nivel_alerta',
                    [sequelize.fn('COUNT', sequelize.col('alerta.id')), 'total_de_alertas']
                ],

                group: ['nivel_alerta']
            })

            return res.status(200).json(getAlertaNivel);

        } catch (error) {
            console.log("Erro ao ir buscar alerta por nivel ", error);
            return res.status(500).jso({ error: "Erro ao ir buscar alerta por nivel" })
        }
    },

    async alertasPendentes(req, res) {
        try {

            const pendentes = await db.alerta.findAll({
                where: { status: 'PENDENTE' },

                include: {
                    model: db.bairro, as: 'bairro',
                    attributes: ['nome'],
                },

                order: [['createdAt', 'DESC']]

            })

            return res.status(200).json({
                total: pendentes.length,
                pendentes

            })

        } catch (error) {
            console.log("Erro ao listar alertas pendentes ", error);
            return res.status(500).json({ error: "Erro ao listar alertas pendentes" })
        }
    },

    async emitirRisco(req, res) {
        const alerta_id = req.params.id;
        const perfil_id = req.perfil.id;
        const nivel = req.body?.nivel;

        try {
            const alertaEncontrado = await db.alerta.findByPk(alerta_id);

            if (!alertaEncontrado) {
                return res.status(404).json("Este alerta não existe");
            }

            const alertaComBairro = await db.alerta.findByPk(alerta_id, {
                include: {
                    model: db.bairro,
                    as: "bairro",
                    attributes: ["nome"]
                }
            });

            const bairroNome = alertaComBairro.bairro?.nome;

            const nivelFinal = nivel || alertaEncontrado.nivel_alerta;


            await db.risco_inundacao.create({
                nivel: nivelFinal,
                descricao: alertaEncontrado.mensagem,
                bairro_id: alertaEncontrado.bairro_id,
                municipio_id: alertaEncontrado.municipio_id,
                perfil_id: perfil_id
            });


            await db.alerta.update(
                {
                    status: 'RESOLVIDO',
                    nivel_alerta: nivelFinal
                },
                { where: { id: alerta_id } }
            );

            const cidadaos = await db.cidadao.findAll({
                where: {
                    bairro_id: alertaEncontrado.bairro_id
                },
                include: [
                    {
                        model: db.perfil,
                        as: "perfil",
                        attributes: ["email", "nome"]
                    },

                    {
                        model: db.bairro, as: "bairro",
                        attributes: ["nome"]
                    }
                ]
            });

            const emails = cidadaos.map(c => c.perfil?.email).filter(email => email);

            await Promise.all(
                emails.map(email =>
                    sendEmail({
                        to: email,
                        subject: "⚠️ Alerta de Inundação",
                        html: gerarEmail({
                            bairroNome,
                            nivel: nivelFinal
                        })
                    })
                )
            );

            return res.status(200).json({
                msg: "Risco emitido e emails enviados com sucesso!"
            });

        } catch (error) {
            console.log("Erro ao emitir risco ", error);
            return res.status(500).json({ error: "Erro ao emitir risco" });
        }
    }
}

