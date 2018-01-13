import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, Button, Grid, Row, Col} from 'react-bootstrap'

const AnecdoteList = ({ anecdotes, vote }) => {
  
  const linkStyle = {
    marginRight: '5px',
    width: '40%'
  }

  const handleClick = (id) => (e) => {
    vote(id)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <ListGroup>
        {anecdotes.map(anecdote => 
          <ListGroupItem key={anecdote.id}>
            <Grid>
              <Row>
                <Col md={5} xs={5}>
                  <Link style={linkStyle} to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </Col>
                <Col md={2} xs={2}>
                  <div>{anecdote.votes} votes</div>
                </Col>
                <Col md={5} xs={5}>
                  <Button bsStyle="primary" onClick={handleClick(anecdote.id)}>Vote</Button>
                </Col>
              </Row>
            </Grid>             
          </ListGroupItem>)}
      </ListGroup>  
    </div>
  )
}

export default AnecdoteList