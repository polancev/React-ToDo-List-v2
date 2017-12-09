import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../controls/Button/index';
import './index.css';
import { inject } from 'mobx-react';

@inject('store')
export default class CategoryItem extends Component {
  
	render() {
    const { category, mode, selected, store, location } = this.props;
    const { categoryStore } = store;
    const { id, name, isOpened } = category;
    const hasChildren = categoryStore.hasChildren(id);
    
		return (
      <div>
        <Link to={{ pathname: `/${id}`, search: location.search }}>
          <div className={selected ? "category selected" : "category"}>
            <div className="category__wrapper">
              { hasChildren && <Button type={isOpened ? 'up' : 'down'} onClick={(e) => this.toggle(id, e)} /> }
              <span className="category__title">{name}</span>
              { (mode === 'edit') && <Button type="edit" onClick={(e) => this.edit(id, name, e)}/> }
            </div>
            <div className="category__wrapper">
              { (mode === 'edit')
                ? (<div>
                    <Button type='delete' onClick={(e) => this.delete(id, e)} />
                    <Button type='add' onClick={(e) => this.add(id, e)}/>
                  </div>)
                : (!selected && <Button type="move" onClick={(e) => this.move(id, e)}/>)
              }    
            </div>
          </div>
        </Link>
			</div>
		);
	}

	add(id, event) {
    event.preventDefault();
    // TODO: add input name interface
    const name = prompt('Enter category name');
    if (name) { 
      this.props.store.categoryStore.add(name, id);
    }
	}

	edit(id, name, event) {
    event.preventDefault();
    // TODO: add input name interface
    name = prompt('Enter category name', name);
    if (name) {
      this.props.store.categoryStore.update(id, 'name', name);
    }
    // this.openModal();
	}

	delete(id, event) {
    event.preventDefault();
    const result = window.confirm('Are you sure you want to delete');
    if (result === true) {
      this.props.store.categoryStore.delete(id);
    }
	}

	toggle(id, event) {
    event.preventDefault();
		this.props.store.categoryStore.toggle(id);
  }
  
  move(id, event) {
    event.preventDefault();
    this.props.onMove(id);
  }

  openModal() {
    this.setState({ showModal: true });
  }
  
  closeModal() {
    this.setState({ showModal: false });
  }
};
