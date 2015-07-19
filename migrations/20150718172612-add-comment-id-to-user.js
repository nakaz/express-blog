'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    queryInterface.addColumn('Users', 'comment_id', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Comments',
        key: 'id'
      }
    });
    done();
  },

  down: function (queryInterface, Sequelize, done) {
    queryInterface.removeColumn('Users', 'comment_id');
    done();
  }
};
