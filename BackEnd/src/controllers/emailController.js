const { sendEmail } = require("../services/emailService");

module.exports = {
    async enviarEmail(req, res) {
        const perfil_id = req.params.id;
        const { nivel, descricao, bairro_id, municipio_id } = req.body;

    }
}
