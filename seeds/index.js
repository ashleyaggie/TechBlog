const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log('\n----- USERS SEEDED -----\n');

  const posts = await Post.bulkCreate(postData);

  console.log('\n----- POSTS SEEDED -----\n');

  const comments = await Comment.bulkCreate(commentData);

  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();
