import React from 'react';
// import SimpleButton from '../../controls/SimpleButton/index';
import './index.css';

export default class EditInput extends React.Component {
	render() {
		return (
			<form
				onSubmit={console.log('submit')}
				onReset={console.log('reset')}
			>

				<button type="submit">Save</button>
				<button type="reset">Cancel</button>
			</form>
		);
	}
}
