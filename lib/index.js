var endpointsGenerator = require('./helpers/endpoints_generator.js');
var fieldsToHtml = require('./helpers/fields_to_html.js');
exports.register = function (server, options, next) {

  var fields = fieldsToHtml(options.fields);
  var routes = endpointsGenerator(options.pages);
  server.route(routes)
  return next();
};

exports.register.attributes = {
  name: 'Abase'
};
