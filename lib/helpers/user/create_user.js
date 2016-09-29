'use strict';

var db = require('../../db.js');

module.exports = function (client, schema, payload, cb) {
  // check payload fields
  // check user model fields
  // take user model subset of payload fields
  // insert row in db

  db.insert(client, schema, { fields: payload }, cb);  // eslint-disable-line
};
