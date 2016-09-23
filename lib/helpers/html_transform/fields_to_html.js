/**
* Example field parameter
* {
*   "email":{
*     "type":"string",
*     "email":true,
*     "required":true
*    }, ...
*  }
*/

var fieldToHtml = require('./field_to_html.js');

module.exports = function (fields) {
  var html = {};

  Object.keys(fields).forEach(function (field) {
    html[field] = fieldToHtml(field, fields[field]);
  });

  return html;
};
