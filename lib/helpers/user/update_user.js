'use strict';

var db = require('../../db.js');

module.exports = function (client, payload, cb) {
  db.update(client, { table_name: 'user_data' }, {  // eslint-disable-line
    fields: payload,
    where: { email: payload.email }
  }, cb);
};
