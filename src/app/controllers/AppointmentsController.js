const express = require("express");
const ROUTES_ENUM = require("../enuns/RoutesEnum");
const { User, Appointment } = require("../models");

/**
 * Controla os processos referentes aos agendamentos dos usuários
 */
class AppointmentsController {
  /**
   * Cria a tela com o formulário de agendamento
   *
   * @param {express.Request} request Requisição efetuada pelo usuário
   * @param {express.Response} response Resposta enviada
   */
  async create(request, response) {
    // Busca o provider pelo id passado na requisicao
    const provider = await User.findByPk(request.params.provider);
    console.log(provider);
    return response.render(ROUTES_ENUM.AGENDAMENTOS.NOVO.VIEW_ROUTE, {
      provider
    });
  }

  /**
   * Efeua o agendamento com o provider
   *
   * @param {express.Request} request Requisição efetuada pelo usuário
   * @param {express.Response} response Resposta enviada
   */
  async store(request, response) {
    const { id } = request.session.user;
    const { provider } = request.params;
    const { date } = request.body;

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    });

    return response.redirect(ROUTES_ENUM.APP.DASHBOARD.ROUTE);
  }
}

module.exports = new AppointmentsController();
