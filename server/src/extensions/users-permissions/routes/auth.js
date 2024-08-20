module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/local",
      handler: "Auth.callback",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/auth/refresh",
      handler: "Auth.refresh",
      config: {
        prefix: "",
        policies: [],
      },
    },
  ],
};
