const ENUM_ROUTES = require("../enuns/RoutesEnum");
const { User } = require("../models");
const express = require("express");

/**
 * Controller responsável pela lógica das requisições feitas no contexto
 * do usuário
 */
class UserController {
  /**
   * Inicializa a view de cadastramento
   *
   * @param {express.Request} req request efetuada pelo usuário
   * @param {express.Response} res response a ser enviada para o usuário
   */
  create(req, res) {
    return res.render(ENUM_ROUTES.USER_ROUTES.SING_UP.VIEW_ROUTE);
  }

  /**
   * Efetua o cadastro do usuário
   *
   * @param {express.Request} req request efetuada pelo usuário
   * @param {express.Response} res response a ser enviada para o usuário
   */
  async store(req, res) {
    try {
      if (!req.body.provider) {
        req.body.provider = 0;
      }
      const { filename } = req.file;
      await User.create({ ...req.body, avatar: filename });
    } catch (err) {
      console.log(err);
    }
    res.redirect(ENUM_ROUTES.HOME.ROUTE);
  }
}

module.exports = new UserController();
