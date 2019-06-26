/**
 * Arquivo de configuração do multer
 * Destinado a configurar o upload de arquivos para a aplicação
 */

const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "tmp", "upload"),
    filename: (req, file, cb) => {
      // gera uma valor randonico
      crypto.randomBytes(16, (err, raw) => {
        // em caso de erro devolve o erro para o callback recebido na chamada do file name
        if (err) return cb(err);
        // em caso de sucesso devolve um nulo para o erro e o novo nome do arquivo
        cb(null, raw.toString("hex") + path.extname(file.originalname));
      });
    }
  })
};
