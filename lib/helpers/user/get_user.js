'use strict';

var db = require('../../db.js');

module.exports = function (client, options, cb) {
  db.select(client, { table_name: 'user_data' }, options, cb);
};
