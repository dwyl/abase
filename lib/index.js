'use strict';

var pg = require('pg');
var addDefaultValues = require('./add_default_values.js');
var loadSchema = require('./load_schema.js');
var updateSchema = require('./update_schema.js');
var routeGen = require('./helpers/endpoints_helpers/endpoints_generator.js');
var configurationRoutes = require('./helpers/configuration/configuration.js');
var db = require('./db.js');

require('env2')('config.env');

module.exports = function (server, options, next) {
  var routes;

  if (!process.env.DATABASE_URL) {
    return next(new Error('DATABASE_URL environment variable is undefined'));
  }

  // server.app.db = new pg.Pool(process.env.DATABASE_URL);
  server.app.db = new pg.Pool({ database: 'abase_test' });

  if (!options.hasOwnProperty('user_schema_path')) {
    return next(new Error('user_schema_path is not defined'));
  }

  server.state('cookie', {
    isHttpOnly: false,
    isSecure: false,
    isSameSite: false
  });


  return loadSchema(options.user_schema_path, function (errorLoad, _schema) {
    if (errorLoad) {
      return next(errorLoad);
    }

    if (!addDefaultValues(_schema)) {
      return next();
    }

    routes = routeGen(_schema.pages, server.app.db).concat(configurationRoutes);
    server.route(routes);

    server.app.db.connect(function (err, client, release) {
      if (err) {
        return next(err);
      }

      db.init(client, _schema, {}, function (dbInitErr) {
        release();

        if (dbInitErr) {
          return next(dbInitErr);
        }

        updateSchema(
          options.user_schema_path,
          _schema,
          function (errorUpdateSchema) {
            return next(errorUpdateSchema);
          });
      });
    });
  });
};

module.exports.attributes = { name: 'Abase' };
