"use strict";

/**
 * employee router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/employee/get-employee-by-user/:userId",
      handler: "get-employee-by-user.getEmployeeByUserId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
