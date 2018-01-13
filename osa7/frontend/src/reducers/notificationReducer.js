const initialState = {
  message: '',
  success: false
}
    
const reducer = (store = initialState, action) => {

  switch(action.type) {
    case 'SHOW':
      return {
        message: action.message,
        success: action.success
      }
    case 'HIDE':
      return {
        message: '',
        success: false
      }
    default:
      return store
  }
}

export const notify = (message, success, seconds) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SHOW',
      message,
      success
    })
    setTimeout(() => dispatch({
      type: 'HIDE'
    }), seconds*1000)
  }
}

export default reducer