import React from 'react';
import { parse } from 'qs';
import Header from './Header/index';
import Categories from '../../components/Categories/index';
import Todos from './Todos/index';

export default function ListView(props) {
  const { match, location } = props;
  const { category } = match.params;
  const { search } = location;
  
  let filterParams = {
    filter: '',
    checked: false 
  };
  if (search) {
    const { filter, checked } = parse(search.split('?')[1]);
    filterParams = { filter, checked: checked === 'true'};
  }
  
  return (
    <div className="app">
      <Header title="To-Do List" />
      <div className="container">
        <div className="left-panel">
          <Categories
            location={location}
            mode="edit"
            selectedCategory={category} />
        </div>
        <div className="right-panel">
          { 
            category && 
            <Todos 
              selectedCategory={category}
              filterParams={filterParams} /> 
          }
        </div>
      </div>
    </div>
  );
}
