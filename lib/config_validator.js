var Joi = require('joi');

var mapObj = require('./create_table_map.js').mapObj;

var fieldTypes = Object.keys(mapObj);
var dbNameRegEx = /^[A-Za-z_]\w{0,62}$/;

var fieldSchema = Joi.object()
  .keys({ type: Joi.any().valid(fieldTypes) })
  .unknown()
;
var configSchema = Joi.object().keys({
  table_name: Joi.string().regex(dbNameRegEx).required(),
  fields: Joi.object().pattern(dbNameRegEx, fieldSchema).required()
});

module.exports = function (config) {
  return Joi.validate(config, configSchema);
};

module.exports.dbNameRegEx = dbNameRegEx;
