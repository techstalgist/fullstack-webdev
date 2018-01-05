const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


const formatBlog = (blog) => {
  return {
    _id: blog._id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    user: {
      _id: blog.user.id,
      username: blog.user.username,
      name: blog.user.name
    }
  }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs.map(formatBlog))
})
  
blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (!body.title || !body.url) {
      response.status(400).end()
      return
    }
    const users = await User.find({})
    const firstUser = users[0]
    let blog = new Blog({
      title: body.title,
      url: body.url,
      likes: body.likes || 0,
      author: body.author,
      user: firstUser._id
    })
    const saveResult = await blog.save()
    firstUser.blogs = firstUser.blogs.concat(saveResult._id)
    await firstUser.save()
    response.status(201).json(saveResult)
  } catch (e) {
    console.log(e)
    response.status(500).json({error: 'something went wrong'})
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (e) {
    console.log(e)
    response.status(400).json({error: 'malformatted id'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
    response.json(updatedBlog)
  } catch(exception) {
    console.log(exception)
    response.status(400).send({error: 'malformatted id'})
  }
})

module.exports = blogsRouter