const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const summaaja = (acc, alkuarvo) => acc + alkuarvo; 
    return blogs.map(el => el.likes).reduce(summaaja, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let favorite = blogs[0]

    blogs.forEach(b => {
        if (b.likes > favorite.likes) {
            favorite = b
        }
    })
    return favorite
}

const mostForKey = (blogs, key, increment) => {
    if (blogs.length === 0) {
        return null
    }

    let authors = []

    blogs.forEach(b => {
        const existingAuthor = authors.find(a => a.author === b.author)
        if (existingAuthor) {
            const otherAuthors = authors.filter(a => a.author !== b.author)
            authors = otherAuthors.concat(
                {
                    ...existingAuthor,
                    [key]: existingAuthor[key] + (increment ? b[increment] : 1)
                }
            )
        } else {
            authors = authors.concat({author: b.author, [key]: (increment ? b[increment] : 1)})
        }
    })

    let most = authors[0]

    authors.forEach(a => {
        if (a[key] > most[key]) {
            most = a
        }
    })
    return most
}

const mostBlogs = (blogs) => {
    return mostForKey(blogs, 'blogs')
}

const mostLikes = (blogs) => {
    return mostForKey(blogs, 'likes', 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}