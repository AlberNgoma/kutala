const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/email");



module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        try {

            const perfil = await db.perfil.findOne({ where: { email } })


            if (!perfil) {
                return res.status(404).json('Perfil não existe')
            }

            const senhaValida = await bcrypt.compare(password, perfil.password);
            if (!senhaValida) {
                return res.status(401).json("Senha inválida")
            }

            const token = jwt.sign(
                {
                    id: perfil.id,
                    nome: perfil.nome,
                    tipo: perfil.tipo,

                },

                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }

            )

            return res.status(200).json({
                msg: 'Login feito com sucesso',
                usuario: {
                    id: perfil.id,
                    nome: perfil.nome,
                    tipo: perfil.tipo,
                    email: perfil.email
                },
                token
            })

        } catch (error) {
            return res.status(500).json("Erro ao logar");
        }
    },

    async recuperarConta(req, res) {

        const { email } = req.body

        try {
            const user = await db.perfil.findOne({ where: { email } })



            if (!user) {
                return res.status(404).json("Este email não existe")
            }

            const token = crypto.randomBytes(32).toString("hex");
            const expires = Date.now() + 15 * 60 * 1000;
            const link = `http://localhost:5173/redefinir-senha/${token}`

            await db.perfil.update(
                {
                    resetToken: token,
                    tokenExpires: expires
                },

                {
                    where: { id: user.id }
                }


            )

            await transporter.sendMail({
                 from: "kutala",
                 to: user.email,
                 subject: "Recuperação de senha",
                 html: `
          <h2>Recuperação de senha</h2>
          <p>Clique no botão abaixo para definir uma nova senha:</p>
  
          <a href="${link}">
              Redefinir senha
          </a>
  
          <p>Este link expira em 15 minutos.</p>
      `
             });

            return res.status(201).json("Token criado com sucesso!")




        } catch (error) {
            console.log("Erro ao recuperar conta ", error)
        }



    },

    async redefinirSenha(req, res) {
        const { token } = req.params;
        const { password } = req.body;

        const user = await db.perfil.findOne(
            {
                where: {
                    resetToken: token
                }
            }
        )

        if (!user) {
            return res.status(400).json("Este token é inválido")
        }

        if (user.tokenExpires < Date.now()) {
            return res.status(400).json("Este token expirou")
        }

        const passwordSegura = await bcrypt.hash(password, 10);

        await db.perfil.update(
            {
                password: passwordSegura,
                resetToken: null,
                tokenExpires: null
            },

            { where: { id: user.id } }
        )

        return res.status(201).json("Senha alterada com sucesso")

    }
}