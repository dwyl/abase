'use strict';

var bCrypt = require('bcrypt');
var db = require('../../db.js');

module.exports = function (client, payload, cb) {
  db.select(
    client,
    { table_name: 'user_data' }, // eslint-disable-line
    { where: { email: payload.email } },
    function (err, result) {
      if (err) {
        return cb(err);
      }

      if (result.rows.length === 0) {
        return cb(new Error('User not found'));
      }

      return bCrypt.compare(payload.password, result.rows[0].password, cb);
    });
};
