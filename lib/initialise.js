module.exports = function (schema) {
  if (!schema.hasOwnProperty('email')) {
    schema.email = {
      type: 'email'
    };
  }

  if (!schema.hasOwnProperty('password')) {
    schema.password = {
      type: 'password'
    };
  }

  return schema;
};
