require('env2')('config.env');
var pg = require('pg');

var testDBUrl = process.env.TEST_DATABASE_URL;

module.exports = new pg.Client(testDBUrl);
