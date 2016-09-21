exports.register = function (server, options, next) {

  server.route([
  {
    method: 'GET',
    path: '/abase',
    config: {
      description: 'abase plugin',
      handler: function (request, reply) {
          return reply('<h1>abase plugin loaded</h1>');
      }
    }
  }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Abase'
};
