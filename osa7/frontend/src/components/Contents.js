import React from 'react'
import {connect} from 'react-redux'
import Menu from './Menu'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

class Contents extends React.Component {

    render() {
        const {loggedInUser} = this.props
        if (!loggedInUser) { return null }
        return (
            <div className='contents'>
                <Menu />
                <Togglable buttonLabel="new blog">
                  <NewBlog />
                </Togglable>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.login.user
    }
}

export default connect(mapStateToProps, null)(Contents)