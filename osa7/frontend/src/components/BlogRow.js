import React from 'react'
import {Link} from 'react-router-dom'

const BlogRow = ({blog}) => {
    
    return (
        <div className="blog-style">
            <div className="basic-info">
                <Link to={`/blogs/${blog._id}`}>
                    {blog.title}, author: {blog.author}
                </Link>
            </div>
      </div> 
    )
}

export default BlogRow

