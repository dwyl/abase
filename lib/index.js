var endpointsGenerator = require('./helpers/endpoints_generator.js');
var fieldToHtml = require('./helpers/field_to_html.js');

exports.register = function (server, options, next) {

  var html = {};

  Object.keys(options.fields).forEach(function (field) {
    html[field] = fieldToHtml(field, options.fields[field]);
  });

  console.log(html);

  var routes = endpointsGenerator(options.pages, html);
  server.route(routes);
  return next();
};

exports.register.attributes = {
  name: 'Abase'
};
