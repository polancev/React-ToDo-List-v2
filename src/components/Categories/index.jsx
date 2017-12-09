import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import UserInput from '../../controls/UserInput/index';
import CategoryList from './CategoryList/index';
import './index.css';

@inject('store')
@observer
export default class Categories extends Component {
  render() {
    const { mode } = this.props;

    return (
      <div className="categories">
        {(mode === "edit") &&
          <div className="category-input">
            <UserInput
              value="Add"
              placeholder="Enter category title"
              onSubmit={this.addCategory} />
          </div>
        }
        <div className="category-list__wrapper">
          <CategoryList {...this.props} parent={null} />
        </div>
      </div>
    )
  };

  addCategory = (name) => {
    this.props.store.categoryStore.add(name);
  }
};
