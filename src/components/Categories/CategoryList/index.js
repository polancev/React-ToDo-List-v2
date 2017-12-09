import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CategoryItem from './CategoryItem/index';
import './index.css';

@inject('store')
@observer
class CategoryList extends Component {
  render() {
    const { store, parent, selectedCategory } = this.props;
    const { categoryStore } = store;
    const categoryItems = categoryStore.getCategories(parent)
      // .list
      // .filter(category => category.parent === parent)
      .map(category => {
        const { id, isOpened } = category;
        const InjectedObserverCategoryList = inject('store')(observer(CategoryList));

        return (
          <li key={id} className="category_list-item">
            <CategoryItem
              {...this.props}
              category={category}
              selected={selectedCategory === id} />
            { isOpened &&
              <div className="embedded-list">
                <InjectedObserverCategoryList
                  {...this.props}
                  parent={id}
                />
              </div>
            }
          </li>
        );
      });

    return <ul className="category_list">{categoryItems}</ul>;
  }
}

export default CategoryList;
