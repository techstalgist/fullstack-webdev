const list = require('../utils/list_helper')
const {initialBlogs} = require('./test_helper')
const emptyList = []

describe('total likes', () => {
    test('of an empty list is zero', () => {
        const result = list.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('of a bigger list is calculated correctly', () => {
        const result = list.totalLikes(initialBlogs)
        expect(result).toBe(17)
    })
})

describe('favorite blog', () => {

    test('of an empty list is null', () => {
        const result = list.favoriteBlog(emptyList)
        expect(result).toBe(null)
    })

    test('of a bigger list is correct', () => {
        const result = list.favoriteBlog(initialBlogs)
        expect(result).toBe(initialBlogs[2])
    })
})

describe('most blogs', () => {

    test('of an empty list is null', () => {
        const result = list.mostBlogs(emptyList)
        expect(result).toBe(null)
    })

    test('of a bigger list is correct', () => {
        const result = list.mostBlogs(initialBlogs)
        
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
        const result = list.mostLikes(initialBlogs)
        
        expect(result.author).toBe('Mark Twain')
        expect(result.likes).toBe(9)
    })
})