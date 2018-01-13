import React from 'react'

const User = ({user}) => {
    
    return (
        <div>
            <h3>{user.name}</h3>
            <h4>Added blogs</h4>
            <ul>
                {user.blogs.map(b => (
                    <li>{b.title} by {b.author}</li>
                ))}
            </ul>
        </div>
    )
}

export default User

