"use strict";

/**
 * A set of functions called "actions" for unique-name
 */

module.exports = {
  department: async (ctx, next) => {
    try {
      const { name } = ctx.query; // Get the department name from query parameters

      if (!name) {
        ctx.status = 400;
        ctx.body = { error: "Department name is required" };
        return;
      }
      const normalizedName = name.toLowerCase();

      // Use a count query to check existence
      // const count = await strapi.db.query("api::department.department").count({
      //   where: { department_name: name || normalizedName },
      // });

      const count = await strapi.db
        .query("api::department.department")
        .findMany({
          where: {
            department_name: {
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
