const environtment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[environtment];
const knex = require('knex')(config);
module.exports = knex;
// This file sets up the database connection using Knex.js based on the current environment.
