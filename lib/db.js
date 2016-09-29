'use strict';

var sqlGen = require('./sql_gen.js');
var configValidator = require('./config_validator.js');
var hash = require('./hash.js');

var methods = {
  init: function (client, config, _, cb) {
    configValidator(config);

    return client.query(sqlGen.init(config), cb);
  },
  insert: function (client, config, options, cb) {
    hash(config, options.fields || {}, function (err, hashed) {
      var tableName, args;

      if (err) {
        return cb(err);
      }

      tableName = config.table_name;
      args = sqlGen.insert(tableName, { fields: hashed }).concat([cb]);

      return client.query.apply(client, args);
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
