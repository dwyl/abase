module.exports = function(name, type, values) {
  var tags = {};
  if(type === 'string') {
    tags.formTag = '<input type="text" name="' + name + '">';
  }
}