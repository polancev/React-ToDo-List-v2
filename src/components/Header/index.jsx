import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { stringify, parse } from 'qs';
import Checkbox from '../Checkbox/index';
import './index.css';


@inject('store')
@observer
class Header extends Component {
  constructor(props) {
    super(props);
    
    const { search } = props.location;
    if (!search) {
      this.state = { filter: '', checked: false };
    } else {
      const { filter, checked } = parse(search.split('?')[1]);
      this.state = { filter, checked: checked === 'true' };
    }
  }

  render() {
    const progress = this.props.store.todoStore.progress;
    const { checked, filter } = this.state;
    return (
      <div>
        <div className="header">
          <Link to="/"><h2>{this.props.title}</h2></Link>
          <div className="header__search">
            <Checkbox
              className="header__checkbox"
              checked={checked}
              title="Show done"
              onClick={this.checkboxChange} />
            <input
              type="text"
              placeholder="Search"
              onChange={this.inputChange}
              value={filter} />
            <input
              type="button"
              onClick={this.clearFilter}
              value="X" />
          </div>
        </div>
        <div className="progress-bar">
          <div className="fill-bar" style={{width: progress+'%'}} ></div>
        </div>
      </div>
    );
  }

  inputChange = (event) => {
    const filter = event.target.value;
    const { checked } = this.state;
    this.changeHistory(filter, checked);
  }

  checkboxChange = (event) => {
    const checked = !this.state.checked;
    const { filter } = this.state;
    this.changeHistory(filter, checked);
  }

  changeHistory(filter, checked) {
    const { pathname } = this.props.history.location;
    this.props.history.push({ pathname, search: stringify({ filter, checked }) });
    this.setState({ filter, checked });
  }

  clearFilter = () => {
    this.setState({ filter: ''});
    const { checked } = this.state;
    this.changeHistory('', checked);
  }
}

export default Header;
