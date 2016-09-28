var users = require('../../../users.json');
var fs = require('fs');
var path = require('path');

module.exports = function (payload) {
  var user = {};
  user.id = users.length;
  Object.keys(payload).forEach(function (key) {
    user[key] = payload[key];
  });
  users.push(user);
  fs.writeFileSync(path.join(__dirname, '../../../users.json'), JSON.stringify(users));

  return users;
};
