import React from 'react'
import {Link} from 'react-router-dom'

const BlogRow = ({blog}) => {
    
    return (
        <tr>
            <td>
                <Link to={`/blogs/${blog._id}`}>
                    {blog.title}, author: {blog.author}
                </Link>
            </td>
        </tr> 
    )
}

export default BlogRow

