'use strict';

var db = require('../../db.js');

module.exports = function (client, payload, cb) {
  // check payload fields
  // check user model fields
  // take user model subset of payload fields
  // insert row in db

  db.insert(client, { table_name: 'user_data' }, { fields: payload }, cb);
};
