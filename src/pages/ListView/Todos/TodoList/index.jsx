import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TodoItem from './TodoItem/index';

@inject('todoStore')
@observer
class TodoList extends Component {
  render() {
    const { todoStore, selectedCategory, filterParams } = this.props;
    const { filter, checked } = filterParams;

    return (
      <ul className="todo-list">
        { todoStore.list({ selectedCategory, checked, filter })
          .map(todo =>
            <li key={todo.id} className="todo-list__item">
              <TodoItem todo={todo} />
            </li>) 
        }
      </ul>
    );
  }
}

export default TodoList;
