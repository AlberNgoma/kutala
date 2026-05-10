const multer = require("multer");
const path = require("path");

const armazenamento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads")); //
    },

    filename: (req, file, cb) => {
        const nomeUnico = Date.now() + "-" + file.originalname;
        cb(null, nomeUnico)
    }
});


const filtro = (req, file, cb) => {
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Apenas imagens são permitidas!"), false);
    }
}

const upload = multer({
    storage: armazenamento, 
    fileFilter: filtro,
    limits: { fileSize: 5 * 1024 * 1024 }
})

module.exports = upload;