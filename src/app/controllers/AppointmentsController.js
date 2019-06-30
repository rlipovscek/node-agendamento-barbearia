const express = require("express");
const ROUTES_ENUM = require("../enuns/RoutesEnum");
const { User, Appointment } = require("../models");
const { Op } = require("sequelize");
const _moment = require("moment");

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

  /**
   * Recupera os agendamentos para o dia de hoje
   *
   * @param {express.Request} request Requisição efetuada pelo usuário
   * @param {express.Response} response Resposta enviada
   */
  async getFromToDay(provider) {
    const date = _moment(parseInt(new Date().getTime()));
    console.log(date.startOf("day").format());
    const agendamentos = await Appointment.findAll({
      where: {
        provider_id: provider,
        date: {
          [Op.between]: [
            date.startOf("day").format(),
            date.endOf("day").format()
          ]
        }
      }
    });
    return agendamentos;
  }

  /**
   * Recupera os agendamentos em D+1 para os proximos 30 dias
   *
   * @param {express.Request} request Requisição efetuada pelo usuário
   * @param {express.Response} response Resposta enviada
   */
  async getFromNext30Days(provider) {
    const date = _moment(parseInt(new Date().getTime()));
    console.log(date.startOf("day").format());
    const agendamentos = await Appointment.findAll({
      where: {
        provider_id: provider,
        date: {
          [Op.between]: [
            date
              .add(1, "days")
              .startOf("day")
              .format(),
            _moment(date)
              .endOf("month")
              .format()
          ]
        }
      }
    });

    return agendamentos;
  }

  /**
   * Recupera todos os agendamentos existente no mês atual
   *
   * @param {express.Request} request Requisição efetuada pelo usuário
   * @param {express.Response} response Resposta enviada
   */
  async getAllFromThisMonth(request, response) {
    const { provider } = request.params;
    const agendamentos = { hoje: [], restanteDoMes: [] };
    agendamentos.hoje = await new AppointmentsController().getFromToDay(
      provider
    );
    agendamentos.restanteDoMes = await new AppointmentsController().getFromNext30Days(
      provider
    );
    console.log(agendamentos);
    return response.redirect(ROUTES_ENUM.APP.DASHBOARD.ROUTE);
  }
}

module.exports = new AppointmentsController();
