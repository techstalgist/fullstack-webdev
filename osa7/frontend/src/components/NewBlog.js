import React from 'react'
import {connect} from 'react-redux'
import {newBlog} from '../reducers/blogsReducer'
import { Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

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
                <Row>
                    <Col md={12} xs={12}><h3>create new</h3></Col>
                </Row>
                <Row>
                    <Col md={7} xs={7}>
                        <form onSubmit={this.createBlog}>
                            <FormGroup>
                                <ControlLabel>title</ControlLabel>
                                <FormControl type="text" name="title" value={this.state.title} onChange={this.handleFieldChange}/>
                                <ControlLabel>author</ControlLabel>
                                <FormControl type="text" name="author" value={this.state.author} onChange={this.handleFieldChange}/>
                                <ControlLabel>url</ControlLabel>
                                <FormControl type="text" name="url" value={this.state.url} onChange={this.handleFieldChange}/>
                                <div className="mt-1">
                                    <Button bsStyle="success" type="submit">create</Button>                  
                                </div>
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(null, {newBlog})(NewBlog)