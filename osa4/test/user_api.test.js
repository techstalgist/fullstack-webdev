const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const User = require('../models/user')
const { usersInDb } = require('./test_helper')
const bcrypt = require('bcrypt')

describe('when there is initially one user in db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const salt = 10
        const passwordHash = await bcrypt.hash('rootpass', salt)
        const user = new User({username:'root', name:'root user', passwordHash: passwordHash, adult: true})
        await user.save()
    })

    test('POST /api/users succeeds with a new username', async () => {
        const oldUsers = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const newUsers = await usersInDb()
        expect(newUsers.length).toBe(oldUsers.length+1)
        const names = newUsers.map(u=>u.username)
        expect(names).toContain(newUser.username)
        const createdUser = newUsers.find(u => u.username === newUser.username)
        expect(createdUser.adult).toBe(true)
    })

    test('POST /api/users fails with an existing username', async () => {
        const oldUsers = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const newUsers = await usersInDb()
        expect(newUsers.length).toBe(oldUsers.length)
    })

    test('password length is checked correctly', async () => {
        const oldUsers = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'sa'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const newUsers = await usersInDb()
        expect(newUsers.length).toBe(oldUsers.length)
    })

    test('POST /api/login logs in an existing user', async () => {
        const userToLogin = {
            username: 'root',
            password: 'rootpass'
        }

        const response = await api
            .post('/api/login')
            .send(userToLogin)
            .expect(200)

        expect(response.body.username).toBe('root')
    })

    afterAll(() => {
        server.close()
    })
})
