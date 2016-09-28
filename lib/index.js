'use strict';

var addDefaultValues = require('./add_default_values.js');
var loadSchema = require('./load_schema.js');
var updateSchema = require('./update_schema.js');

module.exports = function (server, options, next) {
  if (!options.hasOwnProperty('user_schema_path')) {
    return next(new Error('user_schema_path is not defined'));
  }

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
