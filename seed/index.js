var models = require('../models');

var faker = require('faker');

models.sequelize
  .sync({force: true})
  .then(function (){
    //Add Post
    var posts = [];
    var number = Math.floor(Math.random() * 100) + 1;
    for (var i = 0; i < number; i++){
      posts.push(
        {
          title: faker.lorem.words().join(' '),
          content: faker.lorem.paragraphs()
        }
      );
    }
    return models.Post
      .bulkCreate(posts, {returning: true});
  })
  .then(function(posts){
    //Create Comments
    var commentData = [];
    var number = Math.floor(Math.random() * 100) + 1;
    for (var i = 0; i < number; i++){
      commentData.push(
        {text: faker.lorem.sentence()}
        );
    }
    return models.Comment
      .bulkCreate(commentData, {returning: true})
      .then(function(comments){
          comments.forEach(function(comment, array, index){
            var randomPost = faker.random.arrayElement(posts);
            randomPost.addComment(comment);
          });
      });
  });