'use strict';

var pg = require('pg');
var testDBUrl = process.env.TEST_DATABASE_URL;

require('env2')('config.env');

module.exports = new pg.Client(testDBUrl);
