/**
* Initialse with the default values the schema if they are not defined Yet
* Write schema in the file if the default values are added
* @param {object} schema - the user schema object
* @return {boolean} - any changes apply to the schema
*/
var defaultSchema = {
  email: {
    type: 'email'
  },
  password: {
    type: 'password'
  }
};

module.exports = function (schema) {
  var anyChanges = false;
  Object.keys(defaultSchema).forEach(function (field) {
    if (!schema.hasOwnProperty(field)) {
      schema[field] = defaultSchema[field];
      anyChanges = true;
    };
  });
  return anyChanges;
};
