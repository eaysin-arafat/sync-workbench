'use strict';

/**
 * missed-time-sheet service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::missed-time-sheet.missed-time-sheet');
