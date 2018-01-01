const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).end()
    return
  }
  let blog = new Blog(request.body)
  if (!request.body.likes) { blog.likes = 0 }
  const saveResult = await blog.save()
  response.status(201).json(saveResult)
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