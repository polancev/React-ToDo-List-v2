import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import Button from '../../../../../controls/Button/index';
import Checkbox from '../../../../../controls/Checkbox/index';
import './index.css';

@inject('todoStore')
@observer
class TodoItem extends Component {
	render() {
    const { id, task, completed } = this.props.todo;
    
    return (
      <div className="todo">
        <div className="todo__wrapper">
          <Checkbox 
            title={task}
            checked={completed}
            onClick={this.onCheck} />
        </div>
        <div className="todo__wrapper">
          <Link to={`/edit/${id}`}>
            <Button type="edit" />
          </Link>
        </div>
      </div>
    );
  }

  onCheck = () => {
    this.props.todoStore.check(this.props.todo.id);
  }
}

export default TodoItem;
