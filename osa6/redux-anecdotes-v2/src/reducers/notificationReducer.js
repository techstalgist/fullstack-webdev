  const initialState = ''
    
  const reducer = (store = initialState, action) => {

    switch(action.type) {
      case 'SHOW':
        return action.message
      case 'HIDE':
        return ''
      default:
        return store
    }
  }

  export const notify = (message, seconds) => {
    return async (dispatch) => {
      await dispatch({
        type: 'SHOW',
        message
      })
      setTimeout(() => dispatch({
        type: 'HIDE'
      }), seconds*1000)
    }
  }
  
  export default reducer