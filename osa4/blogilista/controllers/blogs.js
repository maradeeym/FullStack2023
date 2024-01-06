const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user'); // Import the User model
const jwt = require('jsonwebtoken');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7);
    }
    return null;
}

blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'perese' });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({ error: 'user not found' });
    }

    const blog = new Blog({
      ...request.body,
      user: user._id // Associate blog with user
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id); // Add blog to user's blogs
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = blogsRouter;
