const knex = require('knex');
const config = require('../../knexfile.js');

// Use test environment
const testDb = knex(config.test);

module.exports = testDb;