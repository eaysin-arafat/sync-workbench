"use strict";

/**
 * employee controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::employee.employee",
  ({ strapi }) => ({
    async getEmployeeByUserId(ctx) {
      const { userId } = ctx.params;

      if (!userId) {
        return ctx.badRequest("User ID is required.");
      }

      try {
        // Use entityService to query the employee by user ID
        const employee = await strapi.entityService.findMany(
          "api::employee.employee",
          {
            filters: { user_info: { id: userId } },
            populate: {
              designation: true,
              employee_of_departments: true,
              employee_status: true,
              employment_status: true,
              manager_of_departments: true,
              payrolls: true,
              performance_reviews: true,
              leaves: true,
              reporting_employees: true,
              documents: true,
              attendances: true,
            },
          }
        );

        if (!employee || employee.length === 0) {
          return ctx.notFound("No employee found for this user ID.");
        }

        // Return the employee data
        return ctx.send({
          success: true,
          data: employee[0], // Assuming there will be only one employee with the user_info
        });
      } catch (error) {
        console.error("Error fetching employee by userId:", error);
        return ctx.internalServerError("Unable to fetch employee.");
      }
    },
  })
);
