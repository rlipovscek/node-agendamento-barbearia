const express = require("express");
const path = require("path");

class FileController {
  /**
   * Recebe o nome de um arquivo e devolve o caminho do arquivo dentro
   * do servidor
   *
   * @param {express.Request} request Requisição efetuada pelo usuário
   * @param {express.Response} response Resposta enviada
   */
  show(request, response) {
    const { file } = request.params;
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "tmp",
      "upload",
      file
    );
    return response.sendFile(filePath);
  }
}

module.exports = new FileController();
