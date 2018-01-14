import React from 'react'

class User extends React.Component {
    componentWillMount() {
        if (this.props.user === undefined) {
            console.log(this.props)
        }
    }

    render() {
        const user = this.props.user
        if (user === undefined) {return null}
        
        return (
            <div>
                <h3>{user.name}</h3>
                <h4>Added blogs</h4>
                <ul>
                    {user.blogs.map(b => (
                        <li key={b._id}>{b.title} by {b.author}</li>
                    ))}
                </ul>
            </div>
        )  
    }
    
}

export default User

