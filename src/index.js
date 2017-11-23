import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
import categoryStore from './stores/CategoryStore';
import todoStore from './stores/TodoStore';
import 'font-awesome/css/font-awesome.css';
import './index.css';


const store = { categoryStore, todoStore };

ReactDOM.render(
	<Provider
		store = {store} >
		<App />
	</Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
