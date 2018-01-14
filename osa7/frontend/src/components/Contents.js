import React from 'react'
import Menu from './Menu'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const Contents = ({loggedIn}) => {
    if (!loggedIn) { return null }
    return (
        <div className='contents'>
            <Menu />
            <Togglable buttonLabel="new blog">
                <NewBlog />
            </Togglable>
        </div>
    )
}

export default Contents