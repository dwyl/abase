'use strict';

var tape = require('tape');
var updateSchema = require('../lib/update_schema.js');
var path = require('path');

tape('attempt to update a schema with a wrong schema path', function (t) {
  var wrongPath = path.join(__dirname, 'fixtures', 'wrongpath', 'schema.json');

  updateSchema(wrongPath, {}, function (error) {
    t.ok(error, 'can\'t write a file with a wrong path');
    t.end();
  });
});
