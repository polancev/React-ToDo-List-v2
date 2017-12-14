import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import categoryStore from '../../stores/CategoryStore';
import todoStore from '../../stores/TodoStore';
import ListView from '../../pages/ListView/index';
import EditView from '../../pages/EditView/index';
import './index.css';


export default function App() {
  return (
    <Provider
      categoryStore={categoryStore} 
      todoStore={todoStore}
	  >
      <div className="app">
        <Router>
          <Switch>
            <Route path="/:category?" exact component={ListView} />
            <Route path="/edit/:todo" exact component={EditView} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}
