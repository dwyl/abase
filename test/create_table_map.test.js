'use strict';

var test = require('tape');

var mapper = require('../lib/create_table_map.js');

var mapObj = mapper.mapObj;

test('Create Table Mapper Obj', function (t) {
  t.equal(
    mapObj['bool'](),
    'BOOLEAN',
    'bool type'
  );
  t.equal(
    mapObj['date'](),
    'DATE',
    'date type'
  );
  t.equal(
    mapObj['float'](),
    'DOUBLE PRECISION',
    'float type'
  );
  t.equal(
    mapObj['timestamp'](),
    'TIMESTAMP',
    'timestamp type'
  );
  t.equal(
    mapObj['int'](),
    'BIGINT',
    'int type, note uses big int to allow for big numbers!!!!'
  );
  t.equal(
    mapObj['text'](),
    'VARCHAR(80)',
    'text type: default'
  );
  t.equal(
    mapObj['text']({ length: 12 }),
    'VARCHAR(12)',
    'text type: specifies length'
  );
  t.end();
});

test('Create Table Mapper Function', function (t) {
  t.equal(
    mapper('field', 'text', { length: 140 }),
    'field VARCHAR(140)',
    'name added to sql query and options passed through'
  );
  t.end();
});
