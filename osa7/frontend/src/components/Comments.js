import React from 'react'
import {Col, ListGroup, ListGroupItem, FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap'

const Comments = ({comments, comment, changeComment, addComment}) => {

  return (
    <div>
        <h3>comments</h3>
        <ListGroup>
            {comments.map(c => 
                (<ListGroupItem key={c._id}>{c.content}</ListGroupItem>)
            )}
        </ListGroup>
        <FormGroup>
            <Col md={7} xs={7}>
                <InputGroup>
                    <FormControl value={comment} onChange={changeComment} />
                    <InputGroup.Button>
                        <Button bsStyle="primary" onClick={addComment}>add comment</Button>
                    </InputGroup.Button>
                </InputGroup>
            </Col>
        </FormGroup>
    </div>
  )
}

export default Comments
