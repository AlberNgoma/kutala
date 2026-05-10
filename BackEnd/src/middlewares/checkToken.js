const jwt = require("jsonwebtoken");

module.exports = function verificarToken(req, res, next) {
    const tokenInteiro = req.headers.authorization;

    if (!tokenInteiro) {
        return res.status(401).json("Token não foi gerado");
    }
    const [, token] = tokenInteiro.split(" ");
    try {

        const tokenDescodificado = jwt.verify(token, process.env.JWT_SECRET);

            req.perfil = {
                id : tokenDescodificado.id,
                nome : tokenDescodificado.nome,
                tipo : tokenDescodificado.tipo
            }

        next();


    } catch {
        return res.status(401).json("Token inválido")

    }
}