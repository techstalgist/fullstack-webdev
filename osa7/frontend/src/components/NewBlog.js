import React from 'react'
import {connect} from 'react-redux'
import {newBlog} from '../reducers/blogsReducer'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

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
            <Grid>
                <Row>
                    <Col><h2>create new</h2></Col>
                </Row>
                <Row>
                    <Col md-5 xs-5>
                        <form onSubmit={this.createBlog}>
                            <FormGroup>
                                <ControlLabel>title</ControlLabel>
                                <FormControl type="text" name="title" value={this.state.title} onChange={this.handleFieldChange}/>
                                <ControlLabel>author</ControlLabel>
                                <FormControl type="text" name="author" value={this.state.author} onChange={this.handleFieldChange}/>
                                <ControlLabel>url</ControlLabel>
                                <FormControl type="text" name="url" value={this.state.url} onChange={this.handleFieldChange}/>
                                <Button bsStyle="success mt-1" type="submit">create</Button>                  
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default connect(null, {newBlog})(NewBlog)