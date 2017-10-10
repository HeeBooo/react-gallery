// action类型type常量
const ADD_TODO = 'ADD_TODO'; // 添加todo选项
const COMPLETE_TODO = 'COMPLETE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// 其他常量
const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  };

// action 是行为的抽象, 是普通的js对象，必须有一个type，是store数据的唯一来源
// action 创建函数
// 添加todo的行为
const addTodo = (text) => {
    return {
        // 多数情况下，type会被定义成字符串常量，当应用规模过大时，建议使用单独的文件存放action
        type: ADD_TODO,
        text
    }
};
// 待办项点一下变成完成(触发)
const completeTodo = (index) => {
    return {
        type: COMPLETE_TODO,
        index
    }
};
// 过滤显示已完成还是待办的还是全部的
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
    addTodo, // 添加
    completeTodo, // 触发
    setVisibilityFilter // 设置可见
};
