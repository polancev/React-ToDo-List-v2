import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Categories from '../../components/Categories/index';
import EditTodo from './EditTodo/index';

@inject('todoStore')
@observer
class EditView extends Component {
  render() {
    const { todoStore, match, history, location } = this.props;
    const id = match.params.todo;
    const todo = todoStore.getTodoById(id) || {};

    return (
      <div className="app">
        <h2>{todo.task}</h2>
        <div className="container">
          <div className="left-panel">
            <Categories
              mode="move"
              location={location}
              selectedCategory={todo.category}
              onMove={this.onMove} />
          </div>
          <div className="right-panel">
            <EditTodo 
              id={id}
              todo={todo}
              history={history} />
          </div>
        </div>
      </div>
    );
  };

  onMove = (category) => {
    const todo = this.props.match.params.todo;
    this.props.todoStore.move(todo, category);
  }
};

export default EditView;
