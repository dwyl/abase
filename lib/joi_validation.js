'use strict';

var Joi = require('joi');

function addCondition (options) {
  return function (joiField, key) {
    var argumentsArr;

    if (typeof joiField[key] === 'undefined') {
      return joiField;
    }

    if (options[key] === true) {
      argumentsArr = [];
    } else {
      argumentsArr = [].concat(options[key]);
    }

    return joiField[key].apply(joiField, argumentsArr);
  };
}

function createJoiField (configOptions, extraOptions) {
  var type = configOptions.type;
  var joiField = Joi[type]();

  return [configOptions, extraOptions].reduce(function (_joiField, options) {
    return Object.keys(options).reduce(addCondition(options), _joiField);
  }, joiField);
}

function addJoiField (config, objSchema) {
  return function (field) {
    var name = field.name;
    var configOptions = config.fields[name];
    var extraOptions = field.options;

    if (!configOptions) {
      throw new Error(name + ' not in the config object');
    }

    objSchema[name] = createJoiField(configOptions, extraOptions);
  };
}

function objectify (field) {
  if (typeof field === 'string') {
    return {
      name: field,
      options: {}
    };
  }
  if (!field.name && !field.options) {
    throw new Error(field, 'field not string or object w name & options keys');
  }

  return field;
}

module.exports = function (config, fields) {
  var objSchema = {};

  fields.map(objectify).forEach(addJoiField(config, objSchema));

  return Joi.object().keys(objSchema);
};
