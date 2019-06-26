const UserRoutes = {
  SING_UP: {
    ROUTE: "/singup",
    VIEW_ROUTE: "auth/singup"
  },
  LOGOUT: {
    ROUTE: "/app/logout"
  }
};

const files = {
  GET_FILE: {
    ROUTE: "/files/:file"
  }
};

const App = {
  DASHBOARD: {
    ROUTE: "/app/dashboard",
    VIEW_ROUTE: "auth/dashboard"
  }
};

const agendamento = {
  NOVO: {
    ROUTE: "/app/appointments/new/:provider",
    VIEW_ROUTE: "appointments/create"
  },
  VERIFICAR_DISPONIBILIDADE: {
    ROUTE: "/app/available/:provider",
    VEW_ROUTE: "available/index"
  }
};

const RoutesEnum = {
  APP: App,
  USER_ROUTES: UserRoutes,
  FILES: files,
  AGENDAMENTOS: agendamento,
  HOME: {
    ROUTE: "/",
    VIEW_ROUTE: "auth/singin"
  },
  SINGIN: {
    ROUTE: "/singin"
  }
};

module.exports = RoutesEnum;
