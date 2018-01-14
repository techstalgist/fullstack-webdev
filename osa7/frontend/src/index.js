import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from './reducers/loginReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import App from './App'
import './index.css'

const reducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
  blogs: blogsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store} >
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
)