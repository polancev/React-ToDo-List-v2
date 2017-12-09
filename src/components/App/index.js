import React, { Component } from 'react';
// import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import ListView from '../../pages/ListView/index';
import EditView from '../../pages/EditView/index';


class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/:category?" exact component={ListView} />
            {/* <Route path="/edit/:todo" exact component={EditView} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
