/**
* load the shema user
* @param {sting} schemaPath - the file path of the schema
* @param {function} cb - callback with error and the schema object
*/
var fs = require('fs');

module.exports = function (schemaPath, cb) {
  fs.readFile(schemaPath, function (err, data) {
    if (err) {
      return cb('Error: sorry impossible to read the file at ' + schemaPath);
    }
    try {
      var schema = JSON.parse(data);
    } catch (parseError) {
      return cb(
        'Error: the schema user file contains unconventianal type,'
        + 'please make sure an schema object is defined'
      );
    }

    return cb(null, schema);
  });
};
