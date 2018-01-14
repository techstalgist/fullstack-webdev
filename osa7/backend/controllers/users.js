const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    try {
        const body = req.body

        const existingUser = await User.find({ username: body.username })
        if (existingUser.length > 0) {
            return res.status(400).json({error: 'username must be unique'})
        }
        if (!body.password || body.password.length < 3) {
            return res.status(400).json({error: 'minimum password length is 3 characters'})
        }

        const salt = 10
        const passwordHash = await bcrypt.hash(body.password, salt)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult || true
        })

        const savedUser = await user.save()
        res.json(savedUser)
    } catch (e) {
        console.log(e)
        res.status(500).json({error: 'Something went wrong'})
    }
})

const formatBlog = (blog) => {
    return {
        _id: blog._id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        comments: blog.comments
    }
}

const formatUser = (user) => {
    return {
        _id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult,
        blogs: user.blogs.map(formatBlog)
    }
}

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs')
    res.json(users.map(formatUser))
})

module.exports = usersRouter