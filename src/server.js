const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const session = require("express-session");
const LokiStorage = require("connect-loki")(session);
const flash = require('connect-flash');

/**
 * Classe que refencia a aplicaçāo node
 */
class App {
  constructor() {
    this.express = express();
    this.setEnvironment();
    this.middleware();
    this.routes();
    this.views();
  }

  /**
   * Define o ambiente em que a aplicação está rodando e seta as veriáveis
   * utilizadas nesse ambiemnte
   */
  setEnvironment() {
    this.isDev = process.env.NODE_ENV !== "production";
  }

  /**
   * Inicia os middlewares usados na API
   */
  middleware() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());
    this.express.use(
      session({
        store: new LokiStorage({
          path: path.resolve(__dirname, "..", "tmp", "session.db")
        }),
        secret: "MyAppSecret",
        resave: false,
        saveUninitialized: true
      })
    );
  }

  /**
   * Inicializa as rotas utilizadas na aplicação
   */
  routes() {
    this.express.use(require("./routes"));
  }

  /**
   * Efetua a inicialização do nunjuncks e insere a pasta de conteudo publico
   * na aplicacao
   */
  views() {
    nunjucks.configure(__dirname + "/app/view", {
      watch: this.isDev,
      autoescape: false,
      express: this.express
    });
    this.express.use(express.static(path.resolve(__dirname, "public")));
    this.express.set("view engine", "njk");
  }
}

module.exports = new App().express;
