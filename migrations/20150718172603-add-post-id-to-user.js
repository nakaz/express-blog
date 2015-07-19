'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.addColumn('Users', 'post_id', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Posts',
        key: 'id'
      }
    });
    done();
  },

  down: function (queryInterface, Sequelize, done) {
    queryInterface.removeColumn('Users', 'post_id');
    done();
  }
};
