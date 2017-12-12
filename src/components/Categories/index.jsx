import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import UserInput from '../../controls/UserInput/index';
import CategoryList from './CategoryList/index';
import './index.css';

@inject('categoryStore')
@observer
export default class Categories extends Component {
  render() {
    const {
      mode,
      selectedCategory,
      location,
      onMove
    } = this.props;
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
          <CategoryList 
            selectedCategory={selectedCategory}
            mode={mode}
            location={location}
            parent=""
            onMove={onMove}
          />
        </div>
      </div>
    )
  };

  addCategory = (name) => {
    this.props.categoryStore.add(name, '');
  }
};
