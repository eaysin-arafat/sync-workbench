module.exports = {
  routes: [
    {
      method: "GET",
      path: "/unique-name/department",
      handler: "unique-name.department",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
