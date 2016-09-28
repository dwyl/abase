'use strict';

var addDefaultValues = require('./add_default_values.js');
var loadSchema = require('./load_schema.js');
var updateSchema = require('./update_schema.js');
var routeGen = require('./helpers/endpoints_helpers/endpoints_generator.js');
var configurationRoutes = require('./helpers/configuration/configuration.js');

module.exports = function (server, options, next) {
  var routes = routeGen(options.pages);

  if (!options.hasOwnProperty('user_schema_path')) {
    return next(new Error('user_schema_path is not defined'));
  }

  server.state('cookie', {
    isHttpOnly: false,
    isSecure: false,
    isSameSite: false
  });

  routes = routes.concat(configurationRoutes);
  server.route(routes);

  return loadSchema(options.user_schema_path, function (errorLoad, schema) {
    if (errorLoad) {
      return next(errorLoad);
    }

    if (!addDefaultValues(schema)) {
      return next();
    }

    return updateSchema(
      options.user_schema_path,
      schema,
      function (errorUpdateSchema) {
        return next(errorUpdateSchema);
      });
  });
};

module.exports.attributes = { name: 'Abase' };
