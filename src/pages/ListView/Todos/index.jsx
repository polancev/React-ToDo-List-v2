import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import UserInput from '../../../controls/UserInput/index';
import TodoList from './TodoList/index';
import './index.css';

@inject('todoStore')
@observer
class Todos extends Component {
  addTodo = (name) => {
    const { todoStore, selectedCategory } = this.props;
    todoStore.add(name, selectedCategory)
  }

  render() {
    return (
      <div className="todos">
        <div className="todo-input">
          <UserInput
            value="Add"
            placeholder="Enter todo title"
            onSubmit={this.addTodo} />
        </div>
        <TodoList selectedCategory={this.props.selectedCategory} {...this.props} />
      </div>
    );
  }
}

export default Todos;
