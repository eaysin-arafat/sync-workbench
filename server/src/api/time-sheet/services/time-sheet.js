'use strict';

/**
 * time-sheet service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::time-sheet.time-sheet');
