'use strict';

var bcrypt = require('bcrypt');

var sqlGen = require('./sql_gen.js');
var configValidator = require('./config_validator.js');
var utils = require('./utils.js');

var methods = {
  init: function (client, config, _, cb) {
    configValidator(config);

    return client.query(sqlGen.init(config), cb);
  },
  insert: function (client, config, options, cb) {
    var passwordValue = options.fields.password;
    var saltNumber = config.salt_number || 10;
    var tableName = config.table_name;
    var makeQuery = function (opts) {
      var args = sqlGen.insert(tableName, opts).concat([cb]);

      return client.query.apply(client, args);
    };

    return bcrypt.hash(passwordValue, saltNumber, function (_, hash) {
      var optionsCopy = utils.shallowCopy(options);

      optionsCopy.fields = utils.shallowCopy(optionsCopy.fields);
      optionsCopy.fields.password = hash;

      return makeQuery(optionsCopy);
    });
  }
};

['select', 'update', 'delete'].forEach(function (method) {
  methods[method] = function (client, config, options, cb) {
    var tableName = config.table_name;
    var args = sqlGen[method](tableName, options).concat([cb]);

    return client.query.apply(client, args);
  };
});

module.exports = methods;
