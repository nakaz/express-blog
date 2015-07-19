'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.User.hasMany(models.Post);
        models.User.hasMany(models.Comment);
      }
    }
  });
  return User;
};