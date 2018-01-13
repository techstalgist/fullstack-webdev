const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { initialBlogs, blogsInDb } = require('./test_helper')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

let token, user

const getTokenForNewUser = async () => {
    const salt = 10
    const passwordHash = await bcrypt.hash('rootpass', salt)
    const newUser = new User({username:'root2', name:'root user2', passwordHash: passwordHash, adult: true})
    await newUser.save()
    const userToLogin = {
        username: 'root2',
        password: 'rootpass'
    }
    const response = await api
        .post('/api/login')
        .send(userToLogin)
    token = response.body.token
    user = newUser
}

describe('when initially some blogs are saved', async () => {
    beforeAll(async () => {
        await getTokenForNewUser()
        await Blog.remove({})
        const objects = initialBlogs.map(b => new Blog({
            ...b,
            user: user._id
        }))
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
                .set('Authorization', `bearer ${token}`)
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
                .set('Authorization', `bearer ${token}`)
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
                .set('Authorization', `bearer ${token}`)
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
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(400)
        })
    })

    describe('deletion of a blog', async () => {
        let addedBlog

        beforeAll(async () => {
            addedBlog = new Blog({author: 'Maija', title:'Reseptejä', url: 'www.hyvablogi.net', user: user._id})
            await addedBlog.save()
        })
        test('DELETE /api/blogs/:id succeeds with a proper statuscode', async () => {
            const oldBlogs = await blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(204)
            
            const newBlogs = await blogsInDb()
            const titles = newBlogs.map(b => b.title)
            expect(titles).not.toContain(addedBlog.title)
            expect(newBlogs.length).toBe(oldBlogs.length-1)
        })

        test('DELETE fails without a token', async () => {
            const oldBlogs = await blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(401)
            
            const newBlogs = await blogsInDb()
            expect(newBlogs.length).toBe(oldBlogs.length)
        })

        test('DELETE fails if user is not the creator of the blog to be deleted', async () => {
            const allUsers = await User.find({})
            const user2 = allUsers.find(u => u._id !== user._id)
            const addedBlog2 = new Blog({author: 'Maija2', title:'Reseptejä2', url: 'www.hyvablogi2.net', user: user2._id})
            await addedBlog2.save()
            const oldBlogs = await blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog2._id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(401)
            
            const newBlogs = await blogsInDb()
            expect(newBlogs.length).toBe(oldBlogs.length)
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

    afterAll(() => {
        server.close()
    })
})