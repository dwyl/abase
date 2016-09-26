var test = require('tape');

var validator = require('../lib/config_validator.js');
var dbNameRegEx = validator.dbNameRegEx;

test('config validator', function (t) {
  t.ok(
    validator({ fields: {} }).error,
    'error if no table_name property'
  );
  t.ok(
    validator({ table_name: 'test' }).error,
    'error if no fields property'
  );
  t.ok(
    validator({ table_name: '2test', fields: {} }).error,
    'error if table name doesn\t pass db name regex'
  );
  t.ok(
    validator({ table_name: '2test', fields: {} }).error,
    'error if table name doesn\t pass db name regex'
  );
  t.ok(
    validator({
      table_name: 'test',
      fields: {'2field': {type: 'string'}}
    }).error,
    'error if field name doesn\'t pass db name regex'
  );
  t.notOk(
    validator({
      table_name: 'test',
      fields: {'email': {type: 'string', unknown: 'allowed'}}
    }).error,
    'no error when extra options unknown'
  );

  t.end();
});

test('dbNameRegEx', function (t) {
  t.ok(
    dbNameRegEx.exec('_a1pha_Numer1c'),
    'alpha numeric keys allowed only'
  );
  t.notOk(
    dbNameRegEx.exec('no£way'),
    'no other characters allowed'
  );
  t.notOk(
    dbNameRegEx.exec('3Numer1c'),
    'must only start with a _ or letter'
  );
  t.notOk(
    dbNameRegEx.exec(
      '_morethan63characters_morethan63characters_morethan63characters_'
    ),
    '63 character limit for field names'
  );

  t.end();
});
