import React from 'react'
import {connect} from 'react-redux'
import {newBlog} from '../reducers/blogsReducer'

class NewBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    handleFieldChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    createBlog = (e) => {
        e.preventDefault()
        const newBlog = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        }
        this.setState({
            title: '',
            author: '',
            url: ''
        })
        this.props.newBlog(newBlog)
    }

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.createBlog}>
                    <div className="row">
                        <div className="column left">title</div>
                        <div className="column right">
                            <input
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column left">author</div>
                        <div className="column right">
                            <input
                                type="text"
                                name="author"
                                value={this.state.author}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column left">url</div>
                        <div className="column right">
                            <input
                                type="text"
                                name="url"
                                value={this.state.url}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                    </div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

export default connect(null, {newBlog})(NewBlog)