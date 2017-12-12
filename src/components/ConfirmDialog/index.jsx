import React from 'react';
import SimpleButton from '../../controls/SimpleButton/index';
import './index.css';

export default function ConfirmDialog(props) {
	return (
		<div className="confirm">
			<div className="confirm__title">{props.title}</div>
			<div className="confirm__buttons">
				<SimpleButton onClick={props.onSubmit}>Ok</SimpleButton>
				<SimpleButton onClick={props.onReset}>Cancel</SimpleButton>
			</div>
		</div>
	);
}
