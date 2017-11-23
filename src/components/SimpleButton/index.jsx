import React, { Component } from 'react'

export default class SimpleButton extends Component {
	render() {
    const { onClick, children } = this.props;
    return (
      <button 
        className="simple bordered"
        onClick={onClick} >
          {children}
      </button>)
	}
}
