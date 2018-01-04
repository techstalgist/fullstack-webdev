const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const User = require('../models/user')

const { usersInDb } = require('./test_helper')

describe('when there is initially one user in db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({username:'root', password: 'rootpass'})
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
})

afterAll(() => {
    server.close()
})