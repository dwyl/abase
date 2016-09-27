/**
* Update the schema json file
* @param {string} user_schema_path, the path of the schema file
* @param {object} schema - the schema user object
* @param {function} cb - callback with error
*/

var fs = require('fs');
module.exports = function (user_schema_path, schema, cb) {
  fs.writeFile(user_schema_path, JSON.stringify(schema), 'utf8', function (errorWriteFile) {
    if (errorWriteFile) {
      return cb(errorWriteFile);
    }
    return cb(undefined);
  });
};