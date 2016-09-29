'use strict';

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

      if (result.rows.length > 1) {
        return cb(new Error('Multiple rows returned for this user'));
      }

      if (result.rows.length === 0) {
        return cb(null, false);
      }

      if (result.rows[0].password === payload.password) {
        return cb(null, true);
      }

      return cb(new Error('Unexpected case'));
    });
};
