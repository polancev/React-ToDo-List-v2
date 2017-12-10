import React, { Component } from 'react';
import withLink from '../../../../hocs/withLink';
import Button from '../../../../controls/Button/index';
import UserInput from '../../../../controls/UserInput/index';
import Modal from '../../../Modal/index';
import './index.css';
import { inject } from 'mobx-react';

@withLink
@inject('categoryStore')
export default class CategoryItem extends Component {
  state = {
    isModalOpen: false
  }

  toggleModal = () => {
    this.setState(state => ({isModalOpen: !state.isModalOpen}));
  }

  render() {
    const { category, mode, isSelected } = this.props;
    const { id, name, isOpened, hasChildren } = category;

    return (
      <div>
        <div className={isSelected ? "category selected" : "category"}>
          <div className="category__wrapper">
            {hasChildren && <Button type={isOpened ? 'up' : 'down'} onClick={(e) => this.toggle(id, e)} />}
            <span className="category__title">{name}</span>
            {(mode === 'edit') && <Button type="edit" onClick={(e) => this.edit(id, name, e)} />}
          </div>
          <div className="category__wrapper">
            {(mode === 'edit')
              ? (<div>
                <Button type='delete' onClick={(e) => this.delete(id, e)} />
                <Button type='add' onClick={(e) => this.add(id, e)} />
                {this.state.isModalOpen &&
                  <Modal>
                    <UserInput
                      value="Save"
                      placeholder="Enter category title"
                      initialValue={name}
                      onSubmit={this.saveEdit} />
                  </Modal>
                }
              </div>)
              : (!isSelected && <Button type="move" onClick={(e) => this.move(id, e)} />)
            }
          </div>
        </div>
      </div>
    );
  }

  add(id, event) {
    event.preventDefault();
    // TODO: add input name interface
    const name = prompt('Enter category name');
    if (name) {
      this.props.categoryStore.add(name, id);
    }
  }

  edit(id, name, event) {
    event.preventDefault();
    // TODO: add input name interface
    // name = prompt('Enter category name', name);
    // if (name) {
    //   this.props.categoryStore.update(id, 'name', name);
    // }
    // this.openModal();
    this.toggleModal();
  }

  saveEdit = (name) => {
    this.props.categoryStore.update(this.props.category.id, 'name', name);
    this.toggleModal();
  }

  delete(id, event) {
    event.preventDefault();
    const result = window.confirm('Are you sure you want to delete');
    if (result === true) {
      this.props.categoryStore.delete(id);
    }
  }

  toggle(id, event) {
    event.preventDefault();
    this.props.categoryStore.toggle(id);
  }

  move(id, event) {
    event.preventDefault();
    this.props.onMove(id);
  }
};
