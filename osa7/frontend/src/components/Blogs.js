import React from 'react'
import BlogRow from './BlogRow'

const Blogs = ({blogs}) => {
    
    return (
        <div>
            <h3>existing blogs</h3>
            {blogs.map(blog => 
                <BlogRow key={blog._id} blog={blog}/>
            )}
        </div>
    )
}

export default Blogs

