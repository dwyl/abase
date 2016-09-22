var endpointsGenerator = require('./helpers/endpoints_generator.js');

exports.register = function (server, options, next) {

  var routes = endpointsGenerator(options);
  server.route(routes)
  return next();
};

exports.register.attributes = {
  name: 'Abase'
};
