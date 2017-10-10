import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// import Gallery from './components/Gallery';
import App from './components/App';
import todoApp from './reducers';

let store = createStore(todoApp),
    rootElement = document.getElementById('root');


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)