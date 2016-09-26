'use strict';

var pg = require('pg');

exports.register = function (server, options, next) {

  var dbUrl = process.env.DATABASE_URL;
  server.app.pool = new pg.Pool(dbUrl);

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      var select = 'select $1::text from information_schema.tables';

      server.app.pool.query(select, ['table_name'], function(err, result) {
        return reply(result);
      });
    }
  });

  server.app.pool.query('CREATE TABLE IF NOT EXISTS '
  + '"' + options.tableName + '"'
  + ' ('
  + 'email varchar(80),'
  + 'username varchar(80)'
  + ')'
  , function (err, result) {
    console.log(err, result);
  });
};

exports.register.attributes = {
  pkg: {
    name: 'Abase'
  }
};
