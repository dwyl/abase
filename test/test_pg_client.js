'use strict';

var pg = require('pg');

require('env2')('config.env');

module.exports = new pg.Client(process.env.TEST_DATABASE_URL);
