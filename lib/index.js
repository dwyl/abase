var initialise = require('./initialise.js');
var fs = require('fs');
var hoek = require('hoek');

module.exports = function (server, options, next) {
  console.log(options);

  if (!options.hasOwnProperty('user_schema_path')) {
    return next('Error: user_schema_path is not defined, please define a user_schema_path');
  }

  fs.readFile(options.user_schema_path, function (err, data) {
    if (err) {
      return next(err);
    }

    var schema = JSON.parse(data);

    // Validation with Joi with the schema (if the schema is valid or not)
    initialise(schema);

    console.log('Schema: ', schema);

    fs.writeFile(options.user_schema_path, JSON.stringify(schema), 'utf8', function (err, data) {
      console.log('ERR: ', err);

      console.log('DATA: ', data);
      return next();
    });
  });
};

module.exports.attributes = {
  name: 'Abase'
};
