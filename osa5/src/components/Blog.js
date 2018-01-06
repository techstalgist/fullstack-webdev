import React from 'react'

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
              <button className="margin-left-sm">like</button>
            </div>
            <div>added by {user.name}</div>
        </div>
        </div>
      </div> 
    )
  }
}

export default Blog