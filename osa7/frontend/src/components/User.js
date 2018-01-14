import React from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

class User extends React.Component {
     render() {
        const user = this.props.user
        if (user === undefined) {return null}
        
        return (
            <div>
                <h3>{user.name}</h3>
                <h4 className="mt-1">Added blogs</h4>
                <ListGroup>
                    {user.blogs.map(b => (
                        <ListGroupItem key={b._id}>
                            <i>{b.title}</i> by {b.author}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        )  
    }
    
}

export default User

