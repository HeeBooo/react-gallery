import React, { Component } from 'react';
import { connect } from 'react-redux';
// 当应用规模过大时，建议使用单独的文件存放action
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
import PropTypes from 'prop-types';

import AddTodo from './AddTodo';
import TodoList  from './TodoList';
import Footer  from './Footer';

class App extends Component {
    render () {
        console.log(this.props)
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return (
            <div>
                {/* 通过dispatch()将action传到store */}
                <AddTodo onAddClick={text => dispatch(addTodo(text))} />
                <TodoList todos = {visibleTodos}
                    onTodoClick={index => dispatch(completeTodo(index))}
                />
                <Footer filter={visibilityFilter} onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))} />
            </div>
        )
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
        default:
            return;
    }
}

function select(state) {
    return {
      visibleTodos: selectTodos(state.todos, state.visibilityFilter),
      visibilityFilter: state.visibilityFilter
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App);