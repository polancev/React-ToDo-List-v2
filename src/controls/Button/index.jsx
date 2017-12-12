import React from 'react';
import './index.css';

export default class Button extends React.Component {
  render() {
    let iconClass = '';
    let border = true;

    switch (this.props.type) {
      case 'add':
        iconClass = 'fa fa-plus button-icon';
        break;
      case 'up':
        iconClass = 'fa fa-angle-up button-icon';
        border = false;
        break;
      case 'down':
        iconClass = 'fa fa-angle-down button-icon';
        border = false;
        break;
      case 'delete':
        iconClass = 'fa fa-trash-o button-icon';
        break;
      case 'edit':
        iconClass = 'fa fa-pencil-square-o button-icon';
        break;
      case 'move':
        iconClass = 'fa fa-share-square-o button-icon';
        break;
      default:
        break;
    };

    return (
      <button
        className={border ? 'bordered' : 'borderless'}
        type="button"
        onClick={this.handleClick} >
        <i className={iconClass} aria-hidden="true"></i>
      </button>
    );
  }

  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClick();
  }
};
