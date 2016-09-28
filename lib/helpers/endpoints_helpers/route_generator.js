'use strict';

var handlerGenerator = require('./handler_generator.js');

module.exports = function (page) {
  var routes = [];

  page.method.forEach(function (method) {
    routes.push(
      {
        path: page.path,
        method: method,
        config: { handler: handlerGenerator(page, method) }
      }
    );
  });

  return routes;
};
