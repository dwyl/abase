module.exports = function (path, contents, html) {
  var content = '<form method="POST" action="' + path + '">';

  contents.forEach(function(tag) {
    if (tag.options.confirmation) {
      content += html[tag.field];
    }
    content += html[tag.field];
  });

  content += '<button type="submit">SUBMIT</button></form>';
  console.log(content);
  return content;
};
