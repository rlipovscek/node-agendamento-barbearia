const express = require("express");
const { User } = require("../models");
const ENUM_ROUTES = require("../enuns/RoutesEnum");
/**
 * Controller responsável pela lógica das requisições feitas para o dashboard
 */
class DashboardController {
  /**
   * Busca por todos os provedores casdastrados no sistem, e retorna uma lista
   * com os provedores cadastrados na base
   *
   * @param {express.Request} request Requisição efetuada pelo usuário
   * @param {express.Response} response Resposta enviada
   */
  async list(request, response) {
    const provedores = await User.findAll({ where: { provider: true } });
    return response.render(ENUM_ROUTES.APP.DASHBOARD.VIEW_ROUTE, {
      provedores
    });
  }
}

module.exports = new DashboardController();
