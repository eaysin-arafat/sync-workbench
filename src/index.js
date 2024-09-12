'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Listen to lifecycle events of the User model
    // strapi.db.lifecycles.subscribe({
    //   models: ["plugin::users-permissions.user"],
    //   // Hook for after creating a User
    //   afterCreate: async ({ result }) => {
    //     console.log(result);
    //     if (result.isEmployee) {
    //       const {
    //         id,
    //         username,
    //         email,
    //         avatar,
    //         first_name,
    //         last_name,
    //         address,
    //         state,
    //         city,
    //         country,
    //         date_of_birth,
    //         phone,
    //         zip_code,
    //         skills,
    //         certification,
    //         work_experiences,
    //         createdAt,
    //         updatedAt,
    //       } = result;
    //       const employeeService = strapi.service("api::employee.employee");
    //       // Create a corresponding Employee record
    //       await employeeService.create({
    //         data: {
    //           userId: id,
    //           username,
    //           name: `${first_name} ${last_name}}`,
    //           email,
    //           avatar,
    //           address,
    //           state,
    //           city,
    //           country,
    //           date_of_birth,
    //           phone,
    //           zip_code,
    //           skills,
    //           certification,
    //           work_experiences,
    //           user_createdAt: createdAt,
    //           user_updatedAt: updatedAt,
    //         },
    //       });
    //     }
    //   },
    //   // Hook for after updating a User
    //   afterUpdate: async ({ result }) => {
    //     if (result.isEmployee) {
    //       const employeeService = strapi.service("api::employee.employee");
    //       const employees = await employeeService.find({
    //         filters: { userId: result.id },
    //       });
    //       const employee = employees.results[0];
    //       if (employee) {
    //         const {
    //           id,
    //           username,
    //           email,
    //           avatar,
    //           first_name,
    //           last_name,
    //           address,
    //           state,
    //           city,
    //           country,
    //           date_of_birth,
    //           phone,
    //           zip_code,
    //           skills,
    //           certification,
    //           work_experiences,
    //           createdAt,
    //           updatedAt,
    //         } = result;
    //         console.log(result);
    //         await employeeService.update(employee.id, {
    //           data: {
    //             userId: id,
    //             username,
    //             name: `${first_name} ${last_name}}`,
    //             email,
    //             avatar,
    //             address,
    //             state,
    //             city,
    //             country,
    //             date_of_birth,
    //             phone,
    //             zip_code,
    //             skills,
    //             certification,
    //             work_experiences,
    //             user_createdAt: createdAt,
    //             user_updatedAt: updatedAt,
    //           },
    //         });
    //       } else {
    //         const {
    //           id,
    //           username,
    //           email,
    //           avatar,
    //           first_name,
    //           last_name,
    //           address,
    //           state,
    //           city,
    //           country,
    //           date_of_birth,
    //           phone,
    //           zip_code,
    //           skills,
    //           certification,
    //           work_experiences,
    //           createdAt,
    //           updatedAt,
    //         } = result;
    //         await employeeService.create({
    //           data: {
    //             userId: id,
    //             username,
    //             name: `${first_name} ${last_name}}`,
    //             email,
    //             avatar,
    //             address,
    //             state,
    //             city,
    //             country,
    //             date_of_birth,
    //             phone,
    //             zip_code,
    //             skills,
    //             certification,
    //             work_experiences,
    //             user_createdAt: createdAt,
    //             user_updatedAt: updatedAt,
    //           },
    //         });
    //       }
    //     }
    //   },
    // });
  },
};
