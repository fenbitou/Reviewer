module.exports = function (app) {
  if (!app) throw new Error('Must provide express instance.');
  var expressRest = require('express-rest');
  var db = require('./config/mongoose')();

  //增加对 json的支持
  var rest = expressRest(app, {
    serializers: {
      'application/json': {
        deserialize: function (req, res, next) {
          next();
        },
        serialize: function (req, res, next) {
          next();
        }
      }
    }
  });
  rest = require('./paper/api.js')(rest);

  return rest;
};


