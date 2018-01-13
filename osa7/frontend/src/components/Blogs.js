import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs, user, deleteBlog, updateBlog}) => {
    
    return (
        <div>
            <h3>existing blogs</h3>
            {blogs.map(blog => 
                <Blog updateBlog={updateBlog} deleteBlog={deleteBlog} loggedInUser={user} key={blog._id} blog={blog}/>
            )}
        </div>
    )
}

export default Blogs

