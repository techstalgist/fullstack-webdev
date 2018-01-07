import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux'
import counterReducer from './counterReducer'

const store = createStore(counterReducer)

const renderApp = () => {
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));    
}

renderApp()
store.subscribe(renderApp)