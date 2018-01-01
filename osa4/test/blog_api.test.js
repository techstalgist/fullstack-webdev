const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { initialBlogs, blogsInDb } = require('./test_helper')

const Blog = require('../models/blog')

describe('when initially some blogs are saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})
        const objects = initialBlogs.map(b => new Blog(b))
        const promiseArray = objects.map(b => b.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.length).toBe(blogsInDatabase.length)
        const returnedTitles = response.body.map(b => b.title)
        blogsInDatabase.forEach(b => {
            expect(returnedTitles).toContain(b.title)
        })
    })

    describe('addition of a new blog', async () => {
        test('a valid blog can be added', async () => {
            const oldBlogs = await blogsInDb()

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
            
            const newBlogs = await blogsInDb()
            expect(newBlogs.length).toBe(oldBlogs.length +1)

            const titles = newBlogs.map(b => b.title)
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
        
            const newBlogs = await blogsInDb()
            const createdBlog = newBlogs.find(b => b.title === 'Harry Potter2')
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
    })

    describe('deletion of a blog', async () => {
        let addedBlog

        beforeAll(async () => {
            addedBlog = new Blog({author: 'Maija', title:'Reseptejä', url: 'www.hyvablogi.net'})
            await addedBlog.save()
        })
        test('DELETE /api/blogs/:id succeeds with a proper statuscode', async () => {
            const oldBlogs = await blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(204)
            
            const newBlogs = await blogsInDb()
            const titles = newBlogs.map(b => b.title)
            expect(titles).not.toContain(addedBlog.title)
            expect(newBlogs.length).toBe(oldBlogs.length-1)
        })
    })

    describe('updating a blog', async () => {
        let blogToUpdate
        beforeAll(async () => {
            const blogs = await blogsInDb()
            blogToUpdate = blogs[0]
        })

        test('updating likes and title using PUT /api/blogs/:id succeeds', async () => {
            const updatedBlog = {
                ...blogToUpdate._doc,
                likes: 5,
                title: 'A new title'
            }
            await api
                .put(`/api/blogs/${blogToUpdate._id}`)
                .send(updatedBlog)
                .expect(200)
            const newBlogs = await blogsInDb()
            const targetBlog = newBlogs.find(b => b._id.toString() === blogToUpdate._id.toString())
            expect(targetBlog.likes).toBe(5)
            expect(targetBlog.title).toBe('A new title')
        })
    })
})

afterAll(() => {
  server.close()
})