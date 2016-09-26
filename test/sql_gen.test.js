// 'use strict';
//
// var tape = require('tape');
// var sqlGen = require('../lib/sql.gen.js');
//
// tape('::init should generate empty string on invalid input', function () {});
//
// tape('::init should generate SQL to create a table if none exists', function (t) {
//   var tableName = 'User';
//   var query = sqlGen.init(tableName);
//   t.equal(query[0], 'CREATE TABLE IF NOT EXISTS $1');
//   t.equal(query[1], tableName);
//   t.end();
// });
//
// tape('::update should generate empty string on invalid input', function () {});
// tape('::update should generate SQL to update a column in a table', function () {});
