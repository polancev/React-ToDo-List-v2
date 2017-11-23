import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Button from '../Button/index';
import './index.css';
import { inject } from 'mobx-react';

@inject('store')
class CategoryItem extends Component {
  constructor() {
    super();
    this.state = { showModal: false };
  }

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
        {/* <Modal 
          isOpen={this.state.showModal} 
          onRequestClose={() => this.closeModal()} 
          className="Modal"
          overlayClassName="Overlay">
            <button onClick={() => this.closeModal()}>close</button>
            <div>I am a modal</div>
        </Modal> */}
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

// const CategoryItem = ({
//   category,
//   selected,
//   hasChildren,
//   onToggle,
//   onEdit,
//   onDelete,
//   onAddSub
// }) => {
//   const { id, name, isOpened } = category;
//   return (
//     <div className={selected ? "category selected" : "category"}>
//       <div className="category__wrapper">
//         {hasChildren && (isOpened
//           ? <AngleUpButton onClick={onToggle}/>
//           : <AngleDownButton onClick={onToggle}/>)
//         }
//         <Link to={`/todos/${id}`} className="category__title">{name}</Link>
//         <EditButton onClick={onEdit}/>
//       </div>
//       <div className="category__wrapper">
//         <DeleteButton onClick={onDelete}/>
//         <AddButton onClick={onAddSub}/>
//       </div>
//     </div>
//   );
// }

// const CategoryMove = ({
//   category,
//   selected,
//   hasChildren,
//   onToggle,
//   onMove
// }) => { 
//   const { title, opened } = category;
//   return (
//     <div className={selected ? "category selected" : "category"}>
//       <div className="category__wrapper">
//         {hasChildren && (opened
//           ? <AngleUpButton onClick={onToggle}/>
//           : <AngleDownButton onClick={onToggle}/>)
//         }
//         <div className="category__title">{title}</div>
//       </div>
//       <div className="category__wrapper">
//         <MoveButton onClick={onMove}/>
//       </div>
//     </div>
//   );
// }

export default CategoryItem;
