const express = require("express");
const ENUN_ROUTES = require("../enuns/RoutesEnum");
const { User } = require("../models");

/**
 * Classe responsavel pelas chamadas de autenticação do usuário
 */
class SessionController {
  /**
   * Metodo que cria a view para a interacao do usuario
   *
   * @param {express.Request} req request enviado pelo usuário
   * @param {express.Response} resp response enviado para o cliente
   */
  create(req, resp) {
    resp.render(ENUN_ROUTES.HOME.VIEW_ROUTE);
  }

  /**
   * Efetua o login na aplicacao
   *
   * @async
   * @param {express.Request} req request enviado pelo usuário
   * @param {express.Response} resp response enviado para o cliente
   */
  async store(req, resp) {
    const { email, password } = req.body;
    const usuario = await User.findOne({ where: { email } });

    if (!usuario) {
      req.flash("error", "Usuário ou senha incorretos!");
      resp.redirect(ENUN_ROUTES.HOME.ROUTE);
    } else {
      if (!(await usuario.checkPassword(password))) {
        req.flash("error", "Usuário ou senha incorretos!");
        resp.redirect(ENUN_ROUTES.HOME.ROUTE);
      } else {
        req.session.user = usuario;
        resp.redirect(ENUN_ROUTES.APP.DASHBOARD.ROUTE);
      }
    }
  }

  /**
   * Exclui a sessao do cliente
   *
   * @param {express.Request} req request enviado pelo usuário
   * @param {express.Response} resp response enviado para o cliente
   */
  destroy(req, resp) {
    req.session.destroy(err => {
      resp.clearCookie("root");
      return resp.redirect(ENUN_ROUTES.HOME.ROUTE);
    });
  }
}

module.exports = new SessionController();
