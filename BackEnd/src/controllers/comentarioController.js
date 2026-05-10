const db = require("../models/index");

module.exports = {
    async criarComentario(req, res) {
        const { texto, bairro_id } = req.body;
        const perfil_id = req.perfil.id
        const foto = req.file ? `uploads/${req.file.filename}` : null;

        try {
            const comentario = await db.comentario.create({
                texto: texto,
                foto: foto,
                perfil_id: perfil_id,
                bairro_id: bairro_id
            })

            return res.status(201).json({ comentário: comentario })

        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar comentário" })
        }
    },

    async listarComentarios(req, res) {
        const bairro_id = req.params.id;
        try {

            const todosComentarios = await db.comentario.findAll({
                where: {
                    bairro_id
                },

                include: {
                    model: db.perfil, as: "perfil",
                    attributes: ['nome', 'email']
                },
                order: [['createdAt', 'DESC']]
            })
            return res.status(200).json(todosComentarios)


        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar comentários" })
        }
    },

    async actualizarComentario(req, res) {
        const comentario_id = req.params.id;
        const { conteudo, bairro_id } = req.body;
        try {
            const comentario = await db.comentario.findByPk(comentario_id);
            if (!comentario) return res.status(404).json({ msg: "Este comentário não existe" })
            await comentario.update({
                conteudo: conteudo,
                bairro_id: bairro_id
            })

            return res.status(200).json({ msg: "Comentário actualizado com sucesso!" })




        } catch (error) {
            console.log("Erro ao actualizar comentário ", error);
            return res.status(500).json({ error: "Erro ao actualizar comentário" })
        }
    },

    async deletarComentario(req, res) {
        const comentario_id = req.params.id;
        try {

            const comentario = await db.comentario.findByPk(comentario_id);
            if (!comentario) return res.status(404).json({ msg: "Este comentário não existe " });

            if (comentario.perfil_id !== perfil_id) {
                return res.status(403).json({ error: "Não tens permissão para apagar este comentário" });
            }

            await comentario.destroy();

            return res.status(200).json({ msg: "Comentário deletado com sucesso!" })


        } catch (error) {
            console.log("Erro ao deletar comentário");
            return res.status(500).json({ error: "Erro ao deletar comentário" })
        }
    },

    async totalComentarios(req, res) {
        try {
            const todosComentarios = await db.comentario.count();

            return res.status(200).json(todosComentarios)

        } catch (error) {
            console.log("Erro ao calcular total de comentários ", error);
            return res.status(500).json({ error: "Erro ao calcular total de comentários" })
        }
    }
}