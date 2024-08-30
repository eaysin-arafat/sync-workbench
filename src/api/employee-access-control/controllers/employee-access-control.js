'use strict';

/**
 * employee-access-control controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::employee-access-control.employee-access-control');
