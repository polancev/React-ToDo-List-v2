import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


export default class Modal extends React.Component {
	componentWillMount() {
		this.root = document.createElement('div');
		document.body.appendChild(this.root);
	}

	componentWillUnmount() {
		document.body.removeChild(this.root);
	}

	render() {
		return ReactDOM.createPortal(
			<div className="modal">
				{this.props.children}
			</div>,
			this.root
		);
	}
}