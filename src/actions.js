// action类型
const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// 其他常量
const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  };

// action 是行为的抽象, 是普通的js对象 必须有一个type
// action 创建函数
const addTodo = (text) => {
    return {
        type: ADD_TODO,
        text
    }
};

const completeTodo = (index) => {
    return {
        type: COMPLETE_TODO,
        index
    }
};

const setVisibilityFilter = (filter) => {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
};

export {
    ADD_TODO, 
    COMPLETE_TODO, 
    SET_VISIBILITY_FILTER,
    VisibilityFilters, 
    addTodo,
    completeTodo,
    setVisibilityFilter
};
