var endpointsGenerator = require('./helpers/endpoints_generator.js');

exports.register = function (server, options, next) {

  var routes = endpointsGenerator(options);
  console.log(JSON.stringify(routes, null, 2));
  return next();
};

exports.register.attributes = {
  name: 'Abase'
};
