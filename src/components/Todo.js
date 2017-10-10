import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todo extends Component {
    render () {
        return (
            <li onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.completed ? 'line-throug' : 'none',
                    cursor: this.props.completed ? 'defautl' : 'pointer'
                }}
            >
            {this.props.text}
            </li>
        )
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
}

export default Todo;