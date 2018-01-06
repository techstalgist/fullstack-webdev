import React from 'react'
import blogService from '../services/blogs'

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

    createBlog = async (e) => {
        e.preventDefault()
        const newBlog = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        }
        try {
            const createdBlog = await blogService.create(newBlog)
            this.props.addBlog(createdBlog)
        } catch (e) {
            console.log(e)
        }
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

export default NewBlog