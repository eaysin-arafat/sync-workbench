module.exports = {
  routes: [
    {
      method: "GET",
      path: "/dashboard",
      handler: "dashboard.dashboardAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
