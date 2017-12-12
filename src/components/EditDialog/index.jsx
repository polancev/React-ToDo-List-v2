import React from 'react';
import SimpleButton from '../../controls/SimpleButton/index';
import './index.css';

export default class EditDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = { editText: props.initial || '' };
	}

	onChange = (event) => {
		this.setState({ editText: event.target.value});
	}

	handleSubmit = () => {
		this.props.onSubmit(this.state.editText);
	}

	render() {
		return (
			<div className="edit-dialog">
				<h3>{this.props.title}</h3>
				<input type="text" value={this.state.editText} onChange={this.onChange} />
				<div className="edit-dialog__buttons">
					<SimpleButton onClick={this.handleSubmit}>Save</SimpleButton>
					<SimpleButton onClick={this.props.onReset}>Cancel</SimpleButton>
				</div>
			</div>
		);
	}
}
