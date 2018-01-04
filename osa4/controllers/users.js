const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const salt = 10
        const passwordHash = await bcrypt.hash(body.password, salt)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult
        })

        const savedUser = await user.save()
        res.json(savedUser)
    } catch (e) {
        console.log(e)
        res.status(500).json({error: 'Something went wrong'})
    }
})

const formatUser = (user) => {
    return {
        _id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult
    }
}

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users.map(formatUser))
})

module.exports = usersRouter