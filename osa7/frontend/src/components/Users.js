import React from 'react'
import {Link} from 'react-router-dom'

const Users = ({users}) => {
    
    return (
        <div>
            <h3>users</h3>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><strong>blogs added</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr>
                            <td><Link to={`/users/${u._id}`}>{u.name}</Link></td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users

