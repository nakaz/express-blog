var models = require('../models');

var faker = require('faker');

models.sequelize
  .sync({force: true})
  .then(function (){
    //Add Post
    return models.Post
      .create({
        title: faker.lorem.words().join(' '),
        content: faker.lorem.paragraphs()
      });
  })
  .then(function(){
    //Create Comments
    return models.Comment
      .create({
        text: faker.lorem.sentences()
      });
  });