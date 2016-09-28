'use strict';

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        description: 'return the home page',
        handler: function (request, reply) {
          return reply('<h1>abase example</h1>');
        }
      }
    }

  ]);

  return next();
};

exports.register.attributes = { name: 'Home' };
