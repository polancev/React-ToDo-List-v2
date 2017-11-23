import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import UserInput from '../UserInput/index';
import CategoryList from '../CategoryList/index';
import './index.css';

@inject('store')
@observer
class Categories extends Component {
  render() {
    const { store, mode } = this.props;

    return (
      <div className="categories">
        {(mode === "edit") &&
          <div className="category-input">
            <UserInput
              value="Add"
              placeholder="Enter category title"
              onSubmit={(name) => store.categoryStore.add(name)} />
          </div>
        }
        <div className="category-list__wrapper">
          <CategoryList {...this.props} parent={null} />
        </div>
      </div>
    )
  }
}

export default Categories;
