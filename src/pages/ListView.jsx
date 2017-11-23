import React from 'react';
import { parse } from 'qs';
import Header from '../components/Header/index';
import Categories from '../components/Categories/index';
import Todos from '../components/Todos/index';

const ListView = (props) => {
  const { match, location } = props;
  const { category } = match.params;
  const { search } = location;
  let filterParams = { filter: '', checked: false };
  if (search) {
    const { filter, checked } = parse(search.split('?')[1]);
    filterParams = { filter, checked: checked === 'true'};
  }
  
  return (
    <div className="app">
      <Header 
        title="To-Do List" 
        {...props}
      />
      <div className="container">
        <div className="left-panel">
          <Categories
            {...props}
            mode="edit"
            selectedCategory={category} />
        </div>
        <div className="right-panel">
          { category && 
            <Todos 
              selectedCategory={category}
              filterParams={filterParams} /> 
          }
        </div>
      </div>
    </div>
  );
}

export default ListView;
