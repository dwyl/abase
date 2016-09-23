var HtmlGenerator = require('./html_generator.js');

module.exports = function(fields) {
  return Object.keys(fields).map(function(field_name) {
    var type = fields[field_name].type;
    return HtmlGenerator(field_name, type);
  })
}