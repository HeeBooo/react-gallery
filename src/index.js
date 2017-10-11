import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

import Gallery from './components/Gallery';
// import App from './components/App';
// import todoApp from './reducers';

// action作用于store，
// reducer根据store响应，
// store是唯一的，
// store包含了完整的state，
// store完全可预测
// let store = createStore(todoApp),
let rootElement = document.getElementById('root');

// console.log(store)
// console.log(store.getState())

// Provider组件的源码
// export default class Provider extends Component {
//     getChildContext() {
//       return { store: this.store }
//     }
   
//     constructor(props, context) {
//       super(props, context)
//       this.store = props.store
//     }
//     render() {
//      this.props.children表示组件的所有子节点
//      return Children.only(this.props.children)
//     }
// }
ReactDOM.render(
    // <Provider store={store}>
    //     <App />
    // </Provider>,
    <Gallery />,
    rootElement
)