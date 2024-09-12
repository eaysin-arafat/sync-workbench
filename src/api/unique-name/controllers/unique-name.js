"use strict";

/**
 * A set of functions called "actions" for unique-name
 */

module.exports = {
  department: async (ctx, next) => {
    try {
      const { name } = ctx.query;

      const contentTypes = strapi.contentTypes;

      if (!name) {
        ctx.status = 400;
        ctx.body = { error: "Department name is required" };
        return;
      }
      const normalizedName = name.toLowerCase();

      const count = await strapi.db
        .query("api::department.department")
        .findMany({
          where: {
            name: {
              $eqi: normalizedName,
            },
          },
        });

      const isExist = count.length > 0;

      ctx.status = 200; // OK
      ctx.body = { available: isExist };
    } catch (err) {
      ctx.status = 500; // Internal Server Error
      ctx.body = { error: err.message };
    }
  },
};
