'use strict';

/**
 * employee-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::employee-status.employee-status');
