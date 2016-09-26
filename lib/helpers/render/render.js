var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

handlebars.registerPartial('email', fs.readFileSync(path.join(__dirname, 'partials/email.html'), 'utf8'));
handlebars.registerPartial('password', fs.readFileSync(path.join(__dirname, 'partials/password.html'), 'utf8'));
handlebars.registerPartial('username', fs.readFileSync(path.join(__dirname, 'partials/username.html'), 'utf8'));
handlebars.registerPartial('age', fs.readFileSync(path.join(__dirname, 'partials/age.html'), 'utf8'));
handlebars.registerPartial('id', fs.readFileSync(path.join(__dirname, 'partials/id.html'), 'utf8'));

module.exports = function(page, request) {
  if (page.type === 'login') {
    var login_path = path.join(__dirname, 'views/login.html');
    var login = fs.readFileSync(login_path, 'utf8');
    var template = handlebars.compile(login);
    return template({path: page.path, method: 'POST', fields: page.fields});
  }
  if (page.type === 'signup') {
    var signup_path = path.join(__dirname, 'views/signup.html');
    var signup = fs.readFileSync(signup_path, 'utf8');
    var template = handlebars.compile(signup);
    return template({path: page.path, method: 'POST', fields: page.fields});
  }

  if (page.type === 'user_list') {
    // get list of user from the database
    var users = require('../../../users.json');

    // get only the values allowed for the user_list page
    // this should be done on the sql and database side
    var userList = users.map(function(user){
      var expectedValues = page.fields.map(function(field){
        return field.field;
      })

      var userData = {};
      Object.keys(user).forEach(function(key){
        if (expectedValues.indexOf(key) > -1) {
          userData[key] = user[key]
        }
      });
      return userData;
    });

    var user_list_path = path.join(__dirname, 'views/user_list.html');
    var user_list = fs.readFileSync(user_list_path, 'utf8');
    var template = handlebars.compile(user_list);
    return template({users: userList});
  }

  if (page.type === 'user_detail') {
    // get the user which match the id and only the fields allowed in the config
    // should be done on sql and database side
    var getUser = require('../user/get_user.js');
    var user = getUser(Number(request.params.id_user));
    var expectedValues = page.fields.map(function(field){
      return field.field;
    });

    var userData = {};
    Object.keys(user).forEach(function(key){
      if (expectedValues.indexOf(key) > -1) {
        userData[key] = user[key]
      }
    });

    var user_detail_path = path.join(__dirname, 'views/user_detail.html');
    var user_detail = fs.readFileSync(user_detail_path, 'utf8');
    var template = handlebars.compile(user_detail);
    return template({userDetails: userData});
  }

  if (page.type === 'user_edit') {
    // get the user which match the id and only the fields allowed in the config
    // should be done on sql and database side
    var getUser = require('../user/get_user.js');
    var user = getUser(Number(request.params.id_user));
    var expectedValues = page.fields.map(function(field){
      return field.field;
    });

    var userData = {};
    Object.keys(user).forEach(function(key){
      if (expectedValues.indexOf(key) > -1) {
        userData[key] = user[key]
      }
    });

    var user_edit_path = path.join(__dirname, 'views/user_edit.html');
    var user_edit = fs.readFileSync(user_edit_path, 'utf8');
    var template = handlebars.compile(user_edit);
    //add the value property to the fields
    Object.keys(userData).forEach(function(attr){
      page.fields.forEach(function(field){
        if(field.field === attr) {
          field.attributes.value = userData[attr];
        }
      })
    });
    return template({userDetails: userData, fields: page.fields});
  }
}