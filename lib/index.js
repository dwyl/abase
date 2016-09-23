'use strict';

exports.register = function (server, options, next) {
  server.dependency(['hapi-postgres-connection'], function (_server, _next) {
    _server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        var select = 'select table_name from information_schema.tables';

        request.pg.client.query(select, function(err, result) {
          return reply(result);
        });
      }
    });

    _next();
  });
  next();
};

exports.register.attributes = {
  pkg: {
    name: 'Abase'
  }
};
