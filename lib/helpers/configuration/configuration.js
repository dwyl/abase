'use strict';

var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var existingFields = require('../../fields.json');
var types = require('../../types.json');

var config = [];

config.push({
  path: '/config/user',
  method: 'GET',
  config: { handler: function (request, reply) {
    var userSchema = fs.readFileSync(
      path.join(__dirname, 'views/user_schema.html'), 'utf8'
    );
    var template = handlebars.compile(userSchema);
    var html = template({
      fields: existingFields, types: types
    });

    return reply(html);
  } }
});

config.push({
  path: '/config/user',
  method: 'POST',
  config: { handler: function (request, reply) {
    var fieldName = request.payload.field_name;

    existingFields[fieldName] = { type: request.payload.field_type };
    fs.writeFileSync(
      path.join(__dirname, '../../fields.json'),
      JSON.stringify(existingFields),
      'utf8'
    );

    reply.redirect('/config/user');
  } }
});

module.exports = config;
