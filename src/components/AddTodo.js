import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


class AddTodo extends Component {
    handleClick (e) {
        const node = ReactDOM.findDOMNode(this.refs.input);
        console.log(node);
        const text = node.value.trim();
        console.log(text);
        this.props.onAddClick(text);
        node.value = '';
    }
    render () {
        return (
            <div>
                <input type="text" ref="input" />
                <button onClick={e => this.handleClick(e)}>Add</button>
            </div>
        )
    }
}

AddTodo.propTypes= {
    onAddClick: PropTypes.func.isRequired
}
export default AddTodo;