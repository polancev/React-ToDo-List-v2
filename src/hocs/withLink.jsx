import React from 'react';
import { Link } from 'react-router-dom';


export default function withLink(WrappedComponent) {
	return class withLinkComponent extends React.Component {
		render() {
			const { link, ...rest } = this.props;
			return this.props.mode === 'edit' 
				? (
					<Link to={link}>
						<WrappedComponent {...rest} />
					</Link>
				)
				: <WrappedComponent {...rest} />;
		}
	}
};
