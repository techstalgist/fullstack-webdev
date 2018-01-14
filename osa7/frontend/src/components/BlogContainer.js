import React from 'react'
import {connect} from 'react-redux'
import Blog from './Blog'

const BlogContainer = ({match, blogs}) => {
  const id = match.params.id
  const blog = blogs.find(b => b._id === id)
  if (blog === undefined) { return null }
  return (
    <Blog blog={blog} />
  )
}

const mapStateToProps = (state) => {
    return {
      blogs: state.blogs.blogs
    }
  }
  
export default connect(
    mapStateToProps,
    null
)(BlogContainer)
