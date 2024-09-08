'use strict';

/**
 * team-leader service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::team-leader.team-leader');
