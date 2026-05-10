const transporter = require("../config/email");

async function sendEmail({to, subject, text, html}) {
    try {
        
        const info = await transporter.sendMail({
            from : `"Kutala" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text, 
            html
        });

        console.log("Email enviado");
        return info

    } catch (error) {
        console.log("Erro ao enviar email ", error);
        throw error;
    }
}

module.exports = {sendEmail};