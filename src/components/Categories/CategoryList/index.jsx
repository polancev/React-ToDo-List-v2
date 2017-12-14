import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CategoryItem from './CategoryItem/index';
import './index.css';


class CategoryList extends Component {
  render() {
    const {
      categoryStore,
      parent,
      selectedCategory,
      mode,
      location,
      onMove
    } = this.props;
    const categoryItems = categoryStore.list(parent).map(category => {
      const { id, isOpened } = category;
      return (
        <li key={id} className="category_list-item">
          <CategoryItem
            category={category}
            mode={mode}
            link={{ pathname: `/${id}`, search: location.search }}
            isSelected={selectedCategory === id}
            onMove={onMove} />
          {isOpened &&
            <div className="embedded-list">
              <InjectedObserverCategoryList
                selectedCategory={selectedCategory}
                mode={mode}
                location={location}
                parent={id}
                onMove={onMove}
              />
            </div>
          }
        </li>
      );
    });

    return <ul className="category_list">{categoryItems}</ul>;
  }
}

const InjectedObserverCategoryList = inject('categoryStore')(observer(CategoryList));

export default InjectedObserverCategoryList;
