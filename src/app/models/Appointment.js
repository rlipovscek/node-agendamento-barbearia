const seq = require("sequelize");

class Appointment {
  /**
   * Exporta o modelo da classe utlizado pelo sequelize
   *
   * @param {seq.Sequelize} sequelize instancia doi sequelize
   * @param {seq.DataTypes} DataTypes Tipo de dados possiveis para os campos
   */
  export(sequelize, DataTypes) {
    const appointment = sequelize.define("Appointment", {
      date: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
      provider_id: DataTypes.INTEGER
    });

    // Cria um associamento entre a tabela de agendamentos e a de usuarios
    appointment.associations = models => {
      // informa qual o usuario agendou o servico
      appointment.belongsTo(models.User, { foreignKey: "user_id" });
      // informa qual provedor possui o servico agendado
      appointment.belongsTo(models.User, { foreignKey: "provider_id" });
    };

    return appointment;
  }
}

module.exports = new Appointment().export;
