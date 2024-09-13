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

      if (!userId) return ctx.badRequest("User ID is required.");

      try {
        const employees = await strapi.entityService.findMany(
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

        if (!employees || employees.length === 0) {
          return ctx.notFound("No employee found for this user ID.");
        }

        const employee = employees[0];

        // Return the employee data
        return ctx.send({
          data: {
            id: employee?.id,
            attributes: {
              date_of_hire: employee.date_of_hire,
              createdAt: employee.createdAt,
              updatedAt: employee.updatedAt,
              publishedAt: employee.publishedAt,
              salary: employee.salary,
              is_internship: employee.is_internship,
              identity: employee.identity,
              reporting_manager: {
                data: employee.reporting_manager
                  ? {
                      id: employee.reporting_manager.id,
                      attributes: employee.reporting_manager,
                    }
                  : null,
              },
              reporting_employees: {
                data: employee.reporting_employees.map((report) => ({
                  id: report.id,
                  attributes: report,
                })),
              },
              designation: {
                data: {
                  id: employee.designation.id,
                  attributes: employee.designation,
                },
              },
              employee_status: {
                data: {
                  id: employee.employee_status.id,
                  attributes: employee.employee_status,
                },
              },
              employment_status: {
                data: {
                  id: employee.employment_status.id,
                  attributes: employee.employment_status,
                },
              },
              employee_of_departments: {
                data: {
                  id: employee.employee_of_departments.id,
                  attributes: employee.employee_of_departments,
                },
              },
            },
          },
          meta: {
            timestamp: new Date().toISOString(),
            message: "Employee data retrieved successfully",
          },
        });
      } catch (error) {
        console.error("Error fetching employee by userId:", error);
        return ctx.internalServerError("Unable to fetch employee.");
      }
    },
  })
);
