const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const initialBlogs = require('./list_helper.test')
const Blog = require('../models/blog')

beforeAll(async () => {
    await Blog.remove({})
    const objects = initialBlogs.map(b => new Blog(b))
    const promiseArray = objects.map(b => b.save())
    await Promise.all(promiseArray)
  })

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.length).toBe(3)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        url: 'www.harrypotter.com',
        likes: 59
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body.length).toBe(initialBlogs.length +1)
    expect(titles).toContain('Harry Potter')
})

test('likes defaults to zero if it is not defined', async () => {
    const newBlog = {
        title: 'Harry Potter2',
        author: 'J.K. Rowling',
        url: 'www.harrypotter.com'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const allBlogs = response.body.map(
        r => {
            return {title: r.title, likes: r.likes}
        })
    const createdBlog = allBlogs.find(b => b.title === 'Harry Potter2')
    expect(createdBlog.likes).toBe(0)
})

test('bad request returned if title missing', async () => {
    const newBlog = {
        author: 'J.K. Rowling',
        url: 'www.harrypotter.com'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('bad request returned if url missing', async () => {
    const newBlog = {
        title: 'Harry Potter3',
        author: 'J.K. Rowling'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
  server.close()
})