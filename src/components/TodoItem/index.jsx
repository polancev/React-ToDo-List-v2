import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '../Button/index';
import Checkbox from '../Checkbox/index';
import './index.css';

class TodoItem extends Component {
	render() {
    const { todo, onCheck } = this.props;
    const { id, task, completed } = todo;
    
    return (
      <div className="todo">
        <div className="todo__wrapper">
          <Checkbox 
            title={task}
            checked={completed}
            onClick={onCheck} />
        </div>
        <div className="todo__wrapper">
          <Link to={`/edit/${id}`}>
            <Button type="edit" />
          </Link>
        </div>
      </div>
    );
  }
}

export default TodoItem;
