'use strict';

var fs = require('fs');
var path = require('path');

/**
* load the schema user
* @param {sting} schemaPath - the file path of the schema
* @param {function} cb - callback with error and the schema object
* @returns {void}
*/
module.exports = function (schemaPath, cb) {
  fs.readFile(
    path.resolve(__dirname, schemaPath),
    'utf8',
    function (err, data) {
      var schema;

      if (err) {
        return cb('Error: sorry impossible to read the file at ' + schemaPath);
      }

      try {
        schema = JSON.parse(data);
      } catch (parseError) {
        return cb(
          'Error: the schema user file contains unconventianal type,'
          + 'please make sure an schema object is defined'
        );
      }


      return cb(null, schema);
    }
  );
};
