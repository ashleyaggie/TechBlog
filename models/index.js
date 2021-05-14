const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User has many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Post has 1 User
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Comment has 1 User
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// // Post has many Comments
// Post.hasMany(Comment, {
//   foreignKey: 'post_id',
//   onDelete: 'SET NULL'
// });

// // Comment has 1 Post
// Comment.belongsTo(Post, {
//   foreignKey: 'post_id'
// });

module.exports = { User, Post, Comment };
