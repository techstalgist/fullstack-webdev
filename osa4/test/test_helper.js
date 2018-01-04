const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        title: 'foobar',
        author: 'Mark Twain',
        url: 'www.google.com',
        likes: 4
    },
    {
        title: 'foobar2',
        author: 'Mark Twain',
        url: 'www.google.com',
        likes: 5
    },
    {
        title: 'Old Man and the Sea',
        author: 'Ernest Hemingway',
        url: 'www.google.com',
        likes: 8
    }
]

const blogsInDb = async () => {
    const dbBlogs = await Blog.find({})
    return dbBlogs
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}