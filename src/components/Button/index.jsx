import React from 'react';
import './index.css';

class Button extends React.Component {
  render() {
    const { type, onClick } = this.props;
    
    let iconClass = '', border = true;
    switch (type) {
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
        onClick={onClick} >
          <i className={iconClass} aria-hidden="true"></i>
      </button>
    );
  }
}

export default Button;
