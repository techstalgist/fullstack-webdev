import loginService from '../services/login'
import blogService from '../services/blogs'
import {notify} from './notificationReducer'

const getInitialStore = () => {
    return {
        user: null,
        username: '',
        password: ''
    }
}

const reducer = (store = getInitialStore(), action) => {
    switch(action.type) {
        case 'LOGIN':
            return {username: '', password: '', user: action.user}
        case 'LOGOUT':
            return getInitialStore()
        case 'CHANGE_FIELD':
            return {
                ...store,
                [action.field]: action.value
            }
        default: return store
    }
}

export const loginAction = (user) => {
    return {
        type: 'LOGIN',
        user
    }
}

export const login = (credentials) => {
  return async (dispatch) => {
      try {
        const user = await loginService.login(credentials)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(loginAction(user))
      } catch(exception) {
          dispatch(notify('username or password incorrect', false, 4))
      }
  }
}

export const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    return {
        type: 'LOGOUT'
    }
}

export const fieldChange = (field, value) => {
    return {
      type: 'CHANGE_FIELD',
      field,
      value
    }
}

export default reducer