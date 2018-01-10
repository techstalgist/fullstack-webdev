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
  
  export const show = (message) => {
    return {
      type: 'SHOW',
      message
    }
  }
  
  export const hide = () => {
    return {
      type: 'HIDE'
    }
  }
  
  export default reducer