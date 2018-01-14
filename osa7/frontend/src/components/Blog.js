import React from 'react'
import Comments from './Comments'
import {connect} from 'react-redux'
import {updateBlog, addComment, deleteBlog, fetchBlogs} from '../reducers/blogsReducer'

class Blog extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }

  componentWillMount() {
    if (this.props.blog === undefined) {
      this.props.fetchBlogs()
    }
  }

  changeComment = (e) => {
    const comment = e.target.value
    this.setState({comment})
  }

  addComment = (e) => {
    const commentToSend = {
      content: this.state.comment
    }
    this.setState({comment: ''})
    this.props.addComment(this.props.blog, commentToSend)
  }

  updateBlog = (e) => {
    e.preventDefault()
    const oldBlog = this.props.blog
    const blogToSend = {
        title: oldBlog.title,
        author: oldBlog.author,
        url: oldBlog.url,
        likes: oldBlog.likes + 1,
        user: oldBlog.user._id
    }
    this.props.updateBlog(oldBlog._id, blogToSend)
  }

  deleteBlog = (e) => {
    const blog = this.props.blog
    const confirmed = window.confirm(`Delete ${blog.title} by ${blog.author} ?`)
    if (confirmed) {
       this.props.deleteBlog(blog)
    }
  }

  render() {
    const {title, author, url, likes, user, comments} = this.props.blog
    const loggedInUser = this.props.loggedInUser
    const canDelete = (loggedInUser && (user.username === loggedInUser.username))
    return (
      <div>
        <h3>{title}, author: {author}</h3>
        <a href={url}>{url}</a>
        <div>
          {likes} likes
          <button className="margin-left-sm" onClick={this.updateBlog}>like</button>
        </div>
        <div>
          added by {user.name}
        </div>
        <div>
          {canDelete ? <button onClick={this.deleteBlog}>delete</button> : null}
        </div>
        <Comments comments={comments} comment={this.state.comment} 
          changeComment={this.changeComment} addComment={this.addComment} />
      </div> 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.login.user
  }
}

export default connect(
  mapStateToProps, 
  {updateBlog, addComment, deleteBlog, fetchBlogs}
)(Blog)