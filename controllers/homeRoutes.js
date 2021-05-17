const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      order: [
        ['created_at', 'DESC']
      ],
      include: [{ model: User }]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: Comment,
          include: {
            model: User
          }
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
    // res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      order: [
        ['created_at', 'DESC']
      ],
      attributes: { exclude: ['password'] },
      include: [{
        model: Post,
        include: {
          model: User
        }
      }],
      order: ['createdAt','DESC']
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard/new', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });

    res.render('addPost', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: Comment,
          include: {
            model: User
          }
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      logged_in: true
    })
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})

router.get('/mypost/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: Comment,
          include: {
            model: User
          }
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('userPost', {
      ...post,
      logged_in: req.session.logged_in
    });
    // res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
