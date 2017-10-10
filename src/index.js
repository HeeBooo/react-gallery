import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// import Gallery from './components/Gallery';
import App from './components/App';
import todoApp from './reducers';

// action作用于store，
// reducer根据store响应，
// store是唯一的，
// store包含了完整的state，
// store完全可预测
let store = createStore(todoApp),
    rootElement = document.getElementById('root');

console.log(store)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)