import React from 'react'
import Comments from './Comments'
import {connect} from 'react-redux'
import {updateBlog, addComment, deleteBlog, fetchBlogs} from '../reducers/blogsReducer'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap'

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
        user: oldBlog.user._id,
        comments: oldBlog.comments
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
        <ListGroup>
          <ListGroupItem>
            address: <a href={url}>{url}</a>
          </ListGroupItem>
          <ListGroupItem>
            <span className={"mr-1"}>{likes} likes</span>
            <Button bsStyle="primary" onClick={this.updateBlog}>like</Button>
          </ListGroupItem>
          <ListGroupItem>
            added by: {user.name}
          </ListGroupItem>
          <ListGroupItem>
          {canDelete ? <Button bsStyle="danger" onClick={this.deleteBlog}>delete</Button> : null}
          </ListGroupItem>
        </ListGroup>
        
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