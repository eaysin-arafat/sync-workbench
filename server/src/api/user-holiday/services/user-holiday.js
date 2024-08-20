'use strict';

/**
 * user-holiday service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-holiday.user-holiday');
