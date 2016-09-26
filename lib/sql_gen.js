'use strict';

var mapper = require('./create_table_map.js');

exports.init = function init (config) {
  var tableName = config.table_name;
  var fields = config.fields;
  var query = 'CREATE TABLE IF NOT EXISTS "' + tableName + '" ';

  var columns = Object.keys(fields).map(function (key) {
    var type = fields[key].type;
    var opts = fields[key];

    return mapper(key, type, opts);
  });

  query += '(' + columns.join(', ') + ')';

  return query;
};
