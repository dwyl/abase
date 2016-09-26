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


exports.update = function update (schema, fields) {
  var tableName = schema.table_name;

  var columns = Object.keys(fields);
  var values = columns.map(function (k) {return fields[k];});
  var params = columns.map(function (e, i) {return '$' + (i + 1);});

  var query = ['INSERT INTO "' + tableName + '"']
    .concat('(' + columns.join(', ') + ')')
    .concat('VALUES')
    .concat('(' + params.join(', ') + ')')
    .join(' ');

  return [query, values];
};
