'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    text: DataTypes.VARCHAR(140)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Comment;
};