const moment = require("moment");
const express = require("express");
const { Appointment } = require("../models");
const { Op } = require("sequelize");
const ROUTES_ENUM = require("../enuns/RoutesEnum");

/**
 * Classe responsável por gerenciar as requisições de disponibilidade de
 * agendamento
 */
class AvavliableController {
  /**
   *
   * @param {express.Request} request Requisição efetuada pelo usuário
   * @param {express.Response} response Resposta enviada
   */
  async index(request, response) {
    const date = moment(parseInt(request.query.date));
    const appointments = await Appointment.findAll({
      where: {
        provider_id: request.params.provider,
        date: {
          [Op.between]: [
            date.startOf("day").format(),
            date.endOf("day").format()
          ]
        }
      }
    });

    const schedule = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ];

    const available = schedule.map(time => {
      const [hour, min] = time.split(":");
      const value = date
        .hour(hour)
        .minute(min)
        .second(0);
      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format("HH:mm") === time)
      };
    });

    return response.render(
      ROUTES_ENUM.AGENDAMENTOS.VERIFICAR_DISPONIBILIDADE.VEW_ROUTE,
      { available }
    );
  }
}

module.exports = new AvavliableController();
