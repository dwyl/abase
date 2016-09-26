var endpointsGenerator = require('./helpers/endpoints_helpers/endpoints_generator.js');
var configurationRoutes = require('./helpers/configuration/configuration.js');

exports.register = function (server, options, next) {
  var routes = endpointsGenerator(options.pages);
  server.state('cookie', {
    isHttpOnly: false,
    isSecure: false,
    isSameSite: false
  });
  routes = routes.concat(configurationRoutes);
  server.route(routes);
  return next();
};

exports.register.attributes = {
  name: 'Abase'
};
