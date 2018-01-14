import userService from '../services/users'

const getInitialStore = () => {
    return {
        users: []
    }
}


const reducer = (store = getInitialStore(), action) => {
    switch(action.type) {
        case 'INIT_USERS':
            return {
                users: action.users
            }
        default: return store
    }
}

export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const users = await userService.getAll()
            dispatch({
                type: 'INIT_USERS',
                users
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export default reducer