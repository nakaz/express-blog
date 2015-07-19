var models = require('../models');

var faker = require('faker');

models.sequelize
  .sync({force: true})
  .then(function (){
    //Add Post
    var postData = [];
    var totalPosts = faker.random.number({min:1, max: 100});
    for (var i = 0; i < totalPosts; i++){
      postData.push(
        {
          title: faker.lorem.words().join(' '),
          content: faker.lorem.paragraphs()
        }
      );
    }
    return models.Post
      .bulkCreate(postData, {returning: true});
  })
  .then(function (posts){
    //Create Comments
    var commentData = [];
    var totalComments = faker.random.number({min:1, max: 100});
    for (var i = 0; i < totalComments; i++){
      commentData.push(
        {text: faker.lorem.sentence()}
        );
    }
    return models.Comment
      .bulkCreate(commentData, {returning: true})
      .then(function(comments){
          comments.forEach(function(element){
            var randomPost = faker.random.arrayElement(posts);
            randomPost.addComment(element);
          });
          return comments;
      })
      .then(function (comments){
        //Add Users
        var userData = [];
        var totalUsers = faker.random.number({min:1, max:20});
        for (var i = 0; i < totalUsers; i++){
          userData.push(
              {username: faker.name.firstName()}
            );
        }
        return models.User
          .bulkCreate(userData, {returning: true})
          .then(function (users){
            posts.forEach(function(element){
              var randomUser = faker.random.arrayElement(users);
              randomUser.addPost(element);
            });
            comments.forEach(function(element){
              var randomUser = faker.random.arrayElement(users);
              randomUser.addComment(element);
            });
          });
      });
  });