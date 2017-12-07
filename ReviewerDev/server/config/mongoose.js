var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
  var db = mongoose.connect(config.mongodb,{useMongoClient: true});

  require("../paper/model");
  return db;
};
