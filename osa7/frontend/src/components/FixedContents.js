import React from 'react'
import Menu from './Menu'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const FixedContents = ({loggedIn}) => {
    if (!loggedIn) { return null }
    return (
        <div className='container'>
            <Menu />
            <Togglable buttonLabel="new blog">
                <NewBlog />
            </Togglable>
        </div>
    )
}

export default FixedContents