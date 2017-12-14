import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App/index.jsx';
import 'font-awesome/css/font-awesome.css';
import './index.css';


ReactDOM.render(
	<App />,
	document.getElementById('root')
);

registerServiceWorker();
