import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TodoItem from '../TodoItem/index';

@inject('store')
@observer
class TodoList extends Component {
  render() {
    const { store, selectedCategory, filterParams } = this.props;
    const { filter, checked } = filterParams;

    return (
      <ul className="todo-list">
      { store.todoStore.list
          .filter(todo => {
            if (todo.category === selectedCategory) {
              if (!checked && todo.completed) return false;
              if (filter && todo.task.toUpperCase().indexOf(filter.toUpperCase()) === -1) return false;
              return true;
            }
            return false;
          })
          .map(todo =>
            <li key={todo.id} className="todo-list__item">
              <TodoItem
                todo={todo}
                onCheck={() => store.todoStore.check(todo.id)} />
            </li>) 
        }
      </ul>
    );
  }
}

export default TodoList;
