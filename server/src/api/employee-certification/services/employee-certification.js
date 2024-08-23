'use strict';

/**
 * employee-certification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::employee-certification.employee-certification');
