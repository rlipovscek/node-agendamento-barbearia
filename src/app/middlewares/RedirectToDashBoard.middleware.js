const express = require("express");
const ENUN_ROUTES = require("../enuns/RoutesEnum");

/**
 * Verifica se o usuario inicio a sessao e o dieciona para o dashboard
 */
class RedirectToDashboardMiddleware {
  /**
   * Verifica se o usuario possui sessao iniciada e o direciona para o dashboard
   *
   * @param {express.Request} req Resquisicao do usuario
   * @param {express.Response} resp response a ser enviado para o usuario
   * @param {exptess.next} next Iterator que continua o a requisicao
   */
  verify(req, resp, next) {
    if (req.session && req.session.user) {
      resp.redirect(ENUN_ROUTES.APP.DASHBOARD.ROUTE);
    } else {
      next();
    }
  }
}

module.exports = new RedirectToDashboardMiddleware().verify;
