"use strict";

/**
 * employee controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::employee.employee",
  ({ strapi }) => ({
    // Override the default create method
    async create(ctx) {
      const { user_info } = ctx.request.body.data;

      if (user_info) {
        // Check if there's an existing employee with the same user
        const existingEmployee = await strapi.db
          .query("api::employee.employee")
          .findOne({
            where: { user_info },
          });

        if (existingEmployee) {
          return ctx.badRequest(
            "This user is already associated with another employee."
          );
        }
      }

      // Proceed with the default create method
      return super.create(ctx);
    },

    // Override the default update method
    async update(ctx) {
      const { id } = ctx.params;
      const { user_info } = ctx.request.body.data;

      if (user_info) {
        // Check if there's an existing employee with the same user_info but different ID
        const existingEmployee = await strapi.db
          .query("api::employee.employee")
          .findOne({
            where: { user_info, id: { $ne: id } },
          });

        if (existingEmployee) {
          return ctx.badRequest(
            "This user_info is already associated with another employee."
          );
        }
      }

      // Proceed with the default update method
      return super.update(ctx);
    },
  })
);
