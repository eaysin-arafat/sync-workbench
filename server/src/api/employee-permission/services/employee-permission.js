'use strict';

/**
 * employee-permission service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::employee-permission.employee-permission');
