import React from 'react'
import BlogRow from './BlogRow'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

const Blogs = ({blogs}) => {
    
    return (
        <div>
            <h3>existing blogs</h3>
            <Table striped>
                <tbody>
                    {blogs.map(blog => 
                        <BlogRow key={blog._id} blog={blog}/>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs.blogs
    }
}

export default connect(mapStateToProps, null)(Blogs)

