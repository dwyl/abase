var tape = require('tape');
var field_to_html = require('../../lib/helpers/field_to_html.js');

tape('returns a html input tag', function (t) {
  var name = 'email';
  var input = {
    type: 'string',
    email: true,
    value: '',
    required: true
  };
  var actual = field_to_html(name, input);
  var expected = '<label>email: </label><input type="string" value="" \>';
  t.equal(actual, expected);
  t.end();
});

tape('returns a html select tag', function (t) {
  var name = 'gender';
  var select = {
    type: 'string',
    values: ['M', 'F', 'O', 'NA'],
    value: 'F'
  };
  var actual = field_to_html(name, select);
  var expected = '<label>gender: </label>'
    + '<select>'
    + '<option>M</option>'
    + '<option selected>F</option>'
    + '<option>O</option>'
    + '<option>NA</option>'
    + '</select>';
  t.equal(actual, expected);
  t.end();
});

tape('returns a input type string with date input', function (t) {
  var name = 'dob';
  var input = {
    type: 'date'
  };
  var actual = field_to_html(name, input);
  var expected = '<label>dob: </label><input type="date" \>';
  t.equal(actual, expected);
  t.end();
});
