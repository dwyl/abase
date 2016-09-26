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

  var query = ['CREATE TABLE IF NOT EXISTS "' + tableName + '"']
    .concat('(' + columns.join(', ') + ')')
    .join(' ');

  return query;
};


exports.select = function select (tableName, options) {
  var columns = options.select || ['*'];
  var query = ['SELECT']
    .concat(columns.join(', '))
    .concat('FROM')
    .concat('"' + tableName + '"')
    .join(' ');
  var values = [];

  return [query, values];
};


exports.insert = function insert (tableName, options) {
  var fields = options.fields || {};
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


exports.update = function update (tableName, options) {
  var fields = options.fields || {};
  var columns = Object.keys(fields).map(function (k, i) {
    return k + '=$' + (i + 1);
  });
  var values = Object.keys(fields).map(function (k) {return fields[k];});

  var query = ['UPDATE "' + tableName + '"']
    .concat('SET')
    .concat(columns.join(', '));

  if (options.where) {
    var keys = Object.keys(options.where);
    var conds = keys.map(function (k, i) {
      return k + '=$' + (values.length + i + 1);
    });
    var vals = keys.map(function (k) {return options.where[k];});

    query = query
      .concat('WHERE')
      .concat(conds.join(', '));

    values = values.concat(vals);
  }

  query = query.join(' ');

  return [query, values];
};


exports.delete = function _delete (tableName, options) {
  var where = options.where;
  var conditions = Object.keys(where).map(function (k, i) {
    return k + '=$' + (i + 1);
  });
  var values = Object.keys(where).map(function (k) {return where[k];});

  var query = ['DELETE FROM "' + tableName + '"']
    .concat('WHERE')
    .concat(conditions.join(', '))
    .join(' ');

  return [query, values];
};
