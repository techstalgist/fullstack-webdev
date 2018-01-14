import {notify} from './notificationReducer'
import blogService from '../services/blogs'

const getInitialStore = () => {
    return {
        blogs: []
    }
}

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (store = getInitialStore(), action) => {
    switch(action.type) {
        case 'CREATE':
            return {
                ...store,
                blogs: store.blogs.concat(action.blog).sort(byLikes)
            }
        case 'UPDATE':
            const blog = action.blog
            const otherBlogs = store.blogs.filter(b => b._id !== blog._id)
            return {
                ...store,
                blogs: otherBlogs.concat(blog).sort(byLikes)
            }
        case 'DELETE':
            const blogsToKeep = store.blogs.filter(b => b._id !== action.id)
            return {
                ...store,
                blogs: blogsToKeep
            }
        case 'INIT':
            return {
                blogs: action.blogs
            }
        case 'COMMENT':
            const {id, comment} = action
            const other = store.blogs.filter(b => b._id !== id)
            const currentBlog = store.blogs.find(b => b._id === id)
            const updatedBlog = {
                ...currentBlog,
                comments: [...currentBlog.comments, comment]
            }
            return {
                ...store,
                blogs: other.concat(updatedBlog).sort(byLikes)
            }
        default: return store
    }
}

export const newBlog = (blog) => {
    return async (dispatch) => {
        try {
          const createdBlog = await blogService.create(blog)
          dispatch({
            type: 'CREATE',
            blog: createdBlog
          })
          dispatch(notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, true, 4))
        } catch(exception) {
            console.log(exception)
            dispatch(notify('title or url missing', false, 4))
        }
    }
}

export const updateBlog = (id, blog) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.update(id, blog)
            dispatch({
                type: 'UPDATE',
                blog: updatedBlog
            })
            dispatch(notify(`blog ${updatedBlog.title} was voted`, true, 4))
        } catch(exception) {
            console.log(exception)
        }
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        try {
            const id = blog._id
            await blogService.deleteBlog(id)
            dispatch({
                type: 'DELETE',
                id
            })
            dispatch(notify(`blog ${blog.title} was deleted`, true, 4))
        } catch (exception) {
            console.log(exception)
        }
    }
}

export const addComment = (blog, comment) => {
    return async (dispatch) => {
        try {
            const id = blog._id
            const newComment = await blogService.newComment(id, comment)
            dispatch({
                type: 'COMMENT',
                id,
                comment: newComment
            })
            dispatch(notify(`comment '${newComment.content}' added to blog '${blog.title}'`, true, 4))
          } catch (e) {
            console.log(e)
        }
    }
}

export const fetchBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()
            dispatch({
                type: 'INIT',
                blogs: blogs.sort(byLikes)
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export default reducer