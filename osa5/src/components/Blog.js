import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false
    }
  }

  toggleDetails = () => {
    this.setState({showDetails: !this.state.showDetails})
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
    const {title, author, url, likes, user} = this.props.blog
    const loggedInUser = this.props.loggedInUser
    const showWhenVisible = { display: this.state.showDetails ? '' : 'none' }
    const canDelete = (loggedInUser && (user.username === loggedInUser.username))
    return (
      <div className="blog-style">
        <div onClick={this.toggleDetails}>{title}, author: {author}</div>
        <div style={showWhenVisible}>
          <div className="margin-left-sm">
            <a href={url}>{url}</a>
            <div>{likes} likes
              <button className="margin-left-sm" onClick={this.updateBlog}>like</button>
            </div>
            <div>added by {user.name}</div>
            <div>
              {canDelete ? <button onClick={this.deleteBlog}>delete</button> : null}
            </div>
        </div>
        </div>
      </div> 
    )
  }
}

export default Blog