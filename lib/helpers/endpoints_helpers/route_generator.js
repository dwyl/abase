'use strict';

var handlerGenerator = require('./handler_generator.js');
var schemaCreator = require('../../joi_validation.js');

module.exports = function (page, pool, schema) {
  var routes = [];

  page.method.forEach(function (method) {
    var validateObj;

    if (method === 'GET') {
      validateObj = {};
    } else if (method === 'POST') {
      validateObj = { payload: schemaCreator(
        schema,
        page.fields.map(function (field) {
          return field.field;
        }
      )) };
    }

    routes.push(
      {
        path: page.path,
        method: method,
        config: {
          handler: handlerGenerator(page, method, pool, schema),
          validate: validateObj
        }
      }
    );
  });

  return routes;
};
