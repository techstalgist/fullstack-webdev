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

  render() {
    const {title, author, url, likes, user} = this.props.blog
    const showWhenVisible = { display: this.state.showDetails ? '' : 'none' }

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
        </div>
        </div>
      </div> 
    )
  }
}

export default Blog