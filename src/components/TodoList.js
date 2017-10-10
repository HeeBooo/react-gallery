import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

class TodoList extends Component {
    render () {
        return (
            <ul>
                {
                    this.props.todos.map((todo, index) => {
                        return (
                            <Todo {...todo}
                                  key={index}
                                  onClick={() => this.props.onToDoClick(index)}
                            />
                        )
                    })
                }
            </ul>
        )
    }
}

TodoList.propTypes= {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}

export default TodoList;