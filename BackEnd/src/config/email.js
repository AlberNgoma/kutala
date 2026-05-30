const nodemailer = require("nodemailer");
const dns = require("node:dns");
const dotenv = require("dotenv");
dotenv.config();

// Força o Node.js a priorizar IPv4 sobre IPv6 neste processo
dns.setDefaultResultOrder('ipv4first');

const transporter = nodemailer.createTransport({
    host: "://gmail.com", // Substitui 'service: gmail' para maior controlo
    port: 465,
    secure: true, // true para a porta 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transporter;
