import { combineReducers } from 'redux';
// 当应用规模过大时，建议使用单独的文件存放action
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

// reducer是响应的抽象，是一个纯方法，传入旧状态和action，返回一个新状态
// 永远不要在reducer中做以下操作：
// 1、修改传入参数(要改的话就在action里面修改了，reducer只拿来改state)
// 2、执行有副作用的操作，如API请求和路由跳转
// 3、调用非纯函数，如Date.now()或Math.random()

// 给state参数设置一个默认值SHOW_ALL
const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state
    }
};

// 影响添加和触发action，给state设置一个默认值空数组
const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            console.log(state); // state是一个数组
            console.log(...state); // ...state是一个对象
            return [
                // ...是数组的扩展运算符,如果扩展运算符后面是一个空数组，则不产生任何效果
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case COMPLETE_TODO:
            return [
                // 返回起始位置到结束位置之间(不包括结束位置)
                ...state.slice(0, action.index),
                // es6书上158页
                // Object.assign复制一个新对象, Example:
                // var obj = { a: 1 };
                // var copy = Object.assign({}, obj);
                // console.log(copy); // { a: 1 }
                // 注意第一个参数必须是一个空对象，不然会改变第一个参数的值，
                // 在此处是合并了三个对象第一个参数是目标对象，后面的参数都是源对象
                // 在此处其实就是更换了completed的值
                Object.assign({}, state[action.index], {
                    completed: true
                }),

                // slice方法在只有一个参数下，返回从该参数指定位置开始到当前数组末尾的所有项
                ...state.slice(action.index + 1)
            ]
        default:
            return state
    }
};

const todoApp = combineReducers({
    visibilityFilter,
    todos
});
  
export default todoApp;