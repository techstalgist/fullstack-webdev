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

module.exports = blogsRouter