module.exports = function (idUser) {
  var users = require('../../../users.json');
  var result;
  users.forEach(function (user) {
    if (Number(user.id) === idUser) {
      result = user;
    }
  });

  return result;
};
