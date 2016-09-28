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
    var user_schema = path.join(__dirname, 'views/user_schema.html');
    var userSchema = fs.readFileSync(user_schema, 'utf8');
    var template = handlebars.compile(userSchema);
    var html = template({
      fields: existingFields, types: types
    });

    return reply(html);
  } }
});

config.push({
  path: '/config/user',
  method: 'post',
  config: { handler: function (request, reply) {
    var newField = {};
    existingFields[request.payload.field_name] = { type: request.payload.field_type };
    fs.writeFileSync(path.join(__dirname, '../../fields.json'), JSON.stringify(existingFields), 'utf8');
    reply.redirect('/config/user');
  } }
});

module.exports = config;
