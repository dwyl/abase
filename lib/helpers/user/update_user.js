var users = require('../../../users.json');
var fs = require('fs');
var path = require('path');

module.exports = function (payload) {
  var indexUser;
  users.forEach(function (usr, index) {
    if (Number(usr.id) === Number(payload.id)) {
      indexUser = index;
    }
  });
  var user = users[indexUser];
  Object.keys(payload).forEach(function (key) {
    user[key] = payload[key];
  });
  users[indexUser] = user;
  fs.writeFileSync(path.join(__dirname, '../../../users.json'), JSON.stringify(users));

  return users;
};
