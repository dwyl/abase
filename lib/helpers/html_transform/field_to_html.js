module.exports = function (name, field) {
  if (field.type === 'string') {
    // select tag
    if (field.values) {
      var options = '';
      field.values.forEach(function (value) {
        options += '<option' + (field.value === value ? ' selected' : '') + '>' + value + '</option>';
      });
      return '<label>' + name + ': </label><select>' + options + '</select>';
    } else {
      // input tag
      var value = field.value !== undefined ? ' value="' + field.value + '"' : '';
      return '<label>' + name + ': </label><input type="string"'+ value + ' \>';
    }
  }
  if (field.type === 'date') {
    // input tag with type date
    var value = field.value !== undefined ? ' value="' + field.value + '"' : '';
    return '<label>' + name + ': </label><input type="date"' + value + ' \>';
  }
  if (field.type === 'password') {
    return '<label>' + name + ': </label><input type="password" \>';
  }
};
