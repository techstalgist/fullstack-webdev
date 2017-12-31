const list = require('../utils/list_helper')

const first =  {
    _id: '123',
    title: 'foobar',
    author: 'Mark Twain',
    url: 'www.google.com',
    likes: 4,
    __v: 0
}

const second = {
    _id: '124',
    title: 'foobar2',
    author: 'Mark Twain',
    url: 'www.google.com',
    likes: 5,
    __v: 0
}

const third = {
    _id: '125',
    title: 'Old Man and the Sea',
    author: 'Ernest Hemingway',
    url: 'www.google.com',
    likes: 8,
    __v: 0
}

const blogs = [first, second, third]
const emptyList = []

describe('total likes', () => {
    test('of an empty list is zero', () => {
        const result = list.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('of a bigger list is calculated correctly', () => {
        const result = list.totalLikes(blogs)
        expect(result).toBe(17)
    })
})

describe('favorite blog', () => {

    test('of an empty list is null', () => {
        const result = list.favoriteBlog(emptyList)
        expect(result).toBe(null)
    })

    test('of a bigger list is correct', () => {
        const result = list.favoriteBlog(blogs)
        expect(result).toBe(third)
    })
})

describe('most blogs', () => {

    test('of an empty list is null', () => {
        const result = list.mostBlogs(emptyList)
        expect(result).toBe(null)
    })

    test('of a bigger list is correct', () => {
        const result = list.mostBlogs(blogs)
        
        expect(result.author).toBe('Mark Twain')
        expect(result.blogs).toBe(2)
    })
})

describe('most likes', () => {

    test('of an empty list is null', () => {
        const result = list.mostLikes(emptyList)
        expect(result).toBe(null)
    })

    test('of a bigger list is correct', () => {
        const result = list.mostLikes(blogs)
        
        expect(result.author).toBe('Mark Twain')
        expect(result.likes).toBe(9)
    })
})