/**
 * Enumerado que contem as rotas usadas para montar as views do usuário
 * e linkar a página ao seu respectivo .njk
 */
const ENUN_ROUTES = require("./app/enuns/RoutesEnum");
const multerConfig = require("./config/multer");
const authMiddleware = require("./app/middlewares/auth.middleware");
const redirectToDashboard = require("./app/middlewares/RedirectToDashBoard.middleware");
const upload = require("multer")(multerConfig);
const express = require("express");

/**
 * Classe responsavel por criar as rotas da aplicaçāo
 */
class Routes {
  constructor() {
    this.routes = express.Router();
    this.userControler = require("./app/controllers/UserController");
    this.sessionControler = require("./app/controllers/SessionController");
    this.dashboardControler = require("./app/controllers/DashboardController");
    this.fileController = require("./app/controllers/FileController");
    this.appointmentsController = require("./app/controllers/AppointmentsController");
    this.availableController = require("./app/controllers/AvaliableController");
    // Aplica o middleware que seta as mensagens a variavel local do response
    this.routes.use(this.setResponseFlash);
    //Aplica o middleware a todas as rotas iniciadas com /app
    this.routes.use("/app", authMiddleware);
    this.initializeRoutes();
  }

  /**
   * Inicializa as rotas usadas na aplicaçāo
   */
  initializeRoutes() {
    this.userRoutes();
    this.sessionRoutes();
    this.appRoutes();
    this.fileRoutes();
    this.agendamentosRoutes();
  }

  /**
   * Rotas de agendamentos
   */
  agendamentosRoutes() {
    this.routes.get(
      ENUN_ROUTES.AGENDAMENTOS.CONSULTAR_AGENDAMENTOS_DO_DIA.ROUTE,
      this.appointmentsController.getAllFromThisMonth
    );

    this.routes.get(
      ENUN_ROUTES.AGENDAMENTOS.CONSULTAR_AGENDAMENTOS_DO_MES.ROUTE,
      this.appointmentsController.getAllFromThisMonth
    );

    this.routes.get(
      ENUN_ROUTES.AGENDAMENTOS.NOVO.ROUTE,
      this.appointmentsController.create
    );

    this.routes.post(
      ENUN_ROUTES.AGENDAMENTOS.NOVO.ROUTE,
      this.appointmentsController.store
    );

    console.log(ENUN_ROUTES.AGENDAMENTOS.VERIFICAR_DISPONIBILIDADE.ROUTE);
    this.routes.get(
      ENUN_ROUTES.AGENDAMENTOS.VERIFICAR_DISPONIBILIDADE.ROUTE,
      this.availableController.index
    );
  }

  /**
   * Rotas de arquivos
   */
  fileRoutes() {
    this.routes.get(ENUN_ROUTES.FILES.GET_FILE.ROUTE, this.fileController.show);
  }

  /**
   * Define as rotas de sessão usadas na aplicação
   */
  sessionRoutes() {
    this.routes.get(
      ENUN_ROUTES.HOME.ROUTE,
      redirectToDashboard,
      this.sessionControler.create
    );
    this.routes.post(ENUN_ROUTES.SINGIN.ROUTE, this.sessionControler.store);
  }

  appRoutes() {
    this.routes.get(
      ENUN_ROUTES.APP.DASHBOARD.ROUTE,
      this.dashboardControler.list
    );
  }

  /**
   * Rotas de navegação ligadas ao usuário
   */
  userRoutes() {
    this.routes.get(
      ENUN_ROUTES.USER_ROUTES.SING_UP.ROUTE,
      redirectToDashboard,
      this.userControler.create
    );

    this.routes.post(
      ENUN_ROUTES.USER_ROUTES.SING_UP.ROUTE,
      upload.single("avatar"),
      this.userControler.store
    );
    this.routes.get(
      ENUN_ROUTES.USER_ROUTES.LOGOUT.ROUTE,
      this.sessionControler.destroy
    );
  }

  /**
   * Atribui os flashs setados nos requests ao locals do response das chamadas
   *
   * @param {express.Request} request
   * @param {express.Response} response
   * @param {express.next} next
   */
  setResponseFlash(request, response, next) {
    response.locals.flashSuccess = request.flash("success");
    response.locals.flashError = request.flash("error");
    return next();
  }
}

module.exports = new Routes().routes;
