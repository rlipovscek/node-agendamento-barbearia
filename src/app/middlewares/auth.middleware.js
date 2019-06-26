const express = require("express");
const ENUN_ROUTES = require("../enuns/RoutesEnum");

/**
 * Classe responsavel por verificar se o usuario tem permissao para ver
 * conteudos que ped
 */
class AuthMiddleware {
  /**
   * Verifica se a requisicao do usuario possui autirizacao para ver conteudos
   * restritos
   *
   * @param {express.Request} req Resquisicao do usuario
   * @param {express.Response} resp response a ser enviado para o usuario
   * @param {exptess.next} next Iterator que continua o a requisicao
   */
  verify(req, resp, next) {
    if (req.session && req.session.user) {
      resp.locals.user = req.session.user;
      next();
    } else {
      console.log("Sem autirizacao para o conteudo");
      resp.redirect(ENUN_ROUTES.HOME.ROUTE);
    }
  }
}

module.exports = new AuthMiddleware().verify;
