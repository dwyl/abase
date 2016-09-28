'use strict';

var fs = require('fs');

/**
* Update the schema json file
* @param {string} userSchemaPath, the path of the schema file
* @param {object} schema - the schema user object
* @param {function} cb - callback with error
* @returns {void}
*/
module.exports = function (userSchemaPath, schema, cb) {
  fs.writeFile(userSchemaPath, JSON.stringify(schema), 'utf8', cb);
};
