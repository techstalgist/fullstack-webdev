import React from 'react'
import blogService from '../services/blogs'
import Comments from './Comments'

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

  addComment = async (e) => {
    const id = this.props.blog._id
    const commentToSend = {
      content: this.state.comment
    }
    this.setState({comment: ''})
    try {
      const newComment = await blogService.newComment(id, commentToSend)
      this.props.addCommentToBlog(id, newComment)
    } catch (e) {
      console.log(e)
    }
  }

  updateBlog = async (e) => {
    e.preventDefault()
    const oldBlog = this.props.blog

    const blogToSend = {
        title: oldBlog.title,
        author: oldBlog.author,
        url: oldBlog.url,
        likes: oldBlog.likes + 1,
        user: oldBlog.user._id
    }
    try {
        const updatedBlog = await blogService.update(oldBlog._id, blogToSend)
        this.props.updateBlog(updatedBlog)
    } catch (e) {
        console.log(e)
    }
  }

  deleteBlog = async (e) => {
    const blog = this.props.blog
    const confirmed = window.confirm(`Delete ${blog.title} by ${blog.author} ?`)
    if (confirmed) {
      try {
        await blogService.deleteBlog(blog._id)
        this.props.deleteBlog(blog._id)
      } catch (e) {
        console.log(e)
      } 
    }
  }

  render() {
    if (this.props.blog === undefined) { return null }
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

export default Blog