var addDefaultValues = require('./add_default_values.js');
var loadSchema = require('./load_schema.js');
var updateSchema = require('./update_schema.js');

module.exports = function (server, options, next) {
  if (!options.hasOwnProperty('user_schema_path')) {
    return next('Error: user_schema_path is not defined, please define a user_schema_path');
  }

  loadSchema(options.user_schema_path, function (errorLoad, schema) {
    if (errorLoad) {
      return next(errorLoad);
    }

    if (addDefaultValues(schema)) {
      updateSchema(options.user_schema_path, schema, function (errorUpdateSchema) {
        return next(errorUpdateSchema);
      });
    } else {
      return next();
    }
  });
};

module.exports.attributes = {
  name: 'Abase'
};
