var endpointsGenerator = require('./helpers/endpoints_generator.js');
var fieldsToHtml = require('./helpers/html_transform/fields_to_html.js');

exports.register = function (server, options, next) {
  var html = fieldsToHtml(options.fields);
  var routes = endpointsGenerator(options.pages, html);

  server.route(routes);
  return next();
};

exports.register.attributes = {
  name: 'Abase'
};
