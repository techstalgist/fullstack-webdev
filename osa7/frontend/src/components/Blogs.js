import React from 'react'
import BlogRow from './BlogRow'
import {connect} from 'react-redux'

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

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs.blogs
    }
}

export default connect(mapStateToProps, null)(Blogs)

