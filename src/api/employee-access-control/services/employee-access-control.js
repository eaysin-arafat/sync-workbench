'use strict';

/**
 * employee-access-control service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::employee-access-control.employee-access-control');
