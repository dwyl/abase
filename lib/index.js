'use strict';

var pg = require('pg');

exports.register = function (server, options, next) {

  var dbUrl = process.env.DATABASE_URL;
  server.app.pool = new pg.Pool(dbUrl);

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      var select = 'select table_name from information_schema.tables';

      _server.app.pool.query(select, function(err, result) {
        return reply(result);
      });
    }
  });

  server.app.pool.connect().then(function (client) {
    client.query('CREATE TABLE IF NOT EXISTS "' + options.table + '" ()')
    .then(function (result) {
      console.log(result);
      next();
    })
    .catch(next);
  });
};

exports.register.attributes = {
  pkg: {
    name: 'Abase'
  }
};
