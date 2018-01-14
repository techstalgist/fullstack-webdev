import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

const Users = ({users}) => {
    
    return (
        <div>
            <h3>users</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th><strong>name</strong></th>
                        <th><strong>blogs added</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td><Link to={`/users/${u._id}`}>{u.name}</Link></td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users
    }
}

export default connect(mapStateToProps, null)(Users)

