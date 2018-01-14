const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')


const formatComment = (c) => {
    return {
        _id: c._id,
        content: c.content
    }
}

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
        },
        comments: blog.comments.map(formatComment)
    }
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user')
        .populate('comments')
    response.json(blogs.map(formatBlog))
})
    
blogsRouter.post('/', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const body = request.body
        if (!body.title || !body.url) {
            response.status(400).end()
            return
        }
        const user = await User.findById(decodedToken.id)

        let blog = new Blog({
            title: body.title,
            url: body.url,
            likes: body.likes || 0,
            author: body.author,
            user: user._id,
            comments: []
        })
        const saveResult = await blog.save()
        saveResult.user = user
        user.blogs = user.blogs.concat(saveResult._id)
        await user.save()
        response.status(201).json(saveResult)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            response.status(401).json({error: e.message})
        } else {
            console.log(e)
            response.status(500).json({error: 'something went wrong'})
        }
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const body = request.body
        if (!body.content) {
            response.status(400).end()
            return
        }
        const blog = await Blog.findById(request.params.id)
        const comment = new Comment({
            content: body.content
        })
        const saveResult = await comment.save()
        blog.comments = blog.comments.concat(saveResult._id)
        await blog.save()
        response.status(201).json(saveResult)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            response.status(401).json({error: e.message})
        } else {
            console.log(e)
            response.status(500).json({error: 'something went wrong'})
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)
        if (blog.user.toString() === user._id.toString()) {
            await blog.remove()
            return response.status(204).end()
        } else {
            return response.status(401).json({error: 'only the blog creator can delete a blog'})
        }
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            response.status(401).json({error: e.message})
        } else {
            console.log(e)
            response.status(500).json({error: 'something went wrong'})
        }
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        likes: body.likes,
        user: body.user,
        comments: body.comments
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
            .populate('user')
            .populate('comments')
        response.json(updatedBlog)
    } catch(exception) {
        console.log(exception)
        response.status(400).send({error: 'malformatted id'})
    }
})

module.exports = blogsRouter