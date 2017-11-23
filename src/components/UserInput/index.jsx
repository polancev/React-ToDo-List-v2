import React, { Component } from 'react';
import './index.css';

export default class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  inputChange = (event) => {
    this.setState({ title: event.target.value });
  }

  inputSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    if (title) {
      this.props.onSubmit(title);
      this.setState({ title: '' })
    }
  }

  render() {
    const {placeholder, value} = this.props;
    const {title} = this.state;
    return (
      <form
        className="user-input"
        onSubmit={this.inputSubmit} >
        <input
          type="text"
          placeholder={placeholder}
          onChange={this.inputChange}
          value={title} />
        <input
          type="submit"
          value={value} />
      </form>
    );
  }
}
