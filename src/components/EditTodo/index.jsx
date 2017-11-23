import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SimpleButton from '../SimpleButton/index';
import Checkbox from '../Checkbox/index';
import './index.css';

@inject('store')
@observer
class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      completed: false,
      description: ''
    };
  }
  
  componentWillMount() {
    const { task, completed, description } = this.props.todo;
    this.setState( { 
      task,
      completed,
      description
    });
  }

  componentWillReceiveProps(nextProps) {
    const { task, completed, description } = nextProps.todo;
    this.setState( { 
      task,
      completed,
      description
    });
  }
  
  render() {
    const { task, completed, description } = this.state;

    return (
      <div className="edit-todo">
        <div className="edit-todo__buttons">
          <SimpleButton onClick={() => this.onSubmit()}>Save changes</SimpleButton>
          <SimpleButton onClick={() => this.closeTodo()}>Cancel</SimpleButton>
        </div>
        <div className="edit-todo__title">
          <input
            type="text"
            placeholder="Input task"
            value={task}
            onChange={this.onTaskChange} />
        </div>
        <div className="edit-todo__check">
          <Checkbox
            title="Done"
            checked={completed}
            onClick={this.onCompleteChange} />
        </div>
        <div className="edit-todo__description">
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.onDescription} />
        </div>
      </div>
    );
  }

  onTaskChange = event => {
    this.setState({ task: event.target.value });
  }

  onCompleteChange = event => {
    this.setState({ completed: event.target.checked });
  }

  onDescription = event => {
    this.setState({ description: event.target.value });
  }

  onSubmit = async () => {
    this.props.store.todoStore.update(this.props.id, this.state);
    this.closeTodo();
  }

  closeTodo = () => {
    this.props.history.goBack();
  }
};

export default EditTodo;
