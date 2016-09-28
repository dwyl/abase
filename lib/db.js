var sqlGen = require('./sql_gen.js');
var configValidator = require('./config_validator.js');

var methods = {
  init: function (client, config, _ , cb) {
    configValidator(config);

    return client.query(sqlGen.init(config), cb);
  }
};

['select', 'update', 'delete', 'insert'].forEach(function (method) {
  methods[method] = function (client, config, options, cb) {
    var tableName = config.table_name;
    var args = sqlGen[method](tableName, options).concat([cb]);

    return client.query.apply(client, args);
  };
});

module.exports = methods;
