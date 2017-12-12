import React, { Component } from 'react';
import withLink from '../../../../hocs/withLink';
import EditDialog from '../../../EditDialog/index';
import Button from '../../../../controls/Button/index';
import ConfirmDialog from '../../../ConfirmDialog/index';
import Modal from '../../../Modal/index';
import './index.css';
import { inject, observer } from 'mobx-react';

@withLink
@inject('categoryStore')
@observer
export default class CategoryItem extends Component {
  state = {
    isAddDialogOpen: false,
    isEditOpen: false,
    isConfirmOpen: false
  }

  render() {
    const { category, mode, isSelected } = this.props;
    const { name, isOpened, hasChildren } = category;

    return (
      <div>
        <div className={isSelected ? "category selected" : "category"}>
          <div className="category__wrapper">
            {hasChildren && <Button type={isOpened ? 'up' : 'down'} onClick={this.toggleCategory} />}
            <span className="category__title">{name}</span>
            {(mode === 'edit') && (
              <div>
                <Button type="edit" onClick={this.toggleEdit} />
                {this.state.isEditOpen &&
                  <Modal>
                    <EditDialog
                      title="Enter category name"
                      initial={name}
                      onSubmit={this.saveEdit}
                      onReset={this.toggleEdit}/>
                  </Modal>
                }
              </div>)
            }
          </div>
          <div className="category__wrapper">
            {(mode === 'edit')
              ? (<div>
                <Button type='delete' onClick={this.toggleConfirm} />
                {this.state.isConfirmOpen &&
                  <Modal>
                    <ConfirmDialog
                      title="Are you sure you want to delete?"
                      onSubmit={this.submitDelete}
                      onReset={this.toggleConfirm}  
                    />
                  </Modal>
                }
                <Button type='add' onClick={this.toggleAddDialog} />
                {this.state.isAddDialogOpen &&
                  <Modal>
                    <EditDialog
                      title="Enter category name"
                      initial='Category '
                      onSubmit={this.submitAdd}
                      onReset={this.toggleAddDialog}/>
                  </Modal>
                }
              </div>)
              : (!isSelected && <Button type="move" onClick={this.move} />)
            }
          </div>
        </div>
      </div>
    );
  }

  submitAdd = (name) => {
    this.props.categoryStore.add(name, this.props.category.id);
    this.toggleAddDialog();
  }

  toggleAddDialog = () => {
    this.setState(state => ({ isAddDialogOpen: !state.isAddDialogOpen }));
  }

  saveEdit = (name) => {
    this.props.categoryStore.update(this.props.category.id, 'name', name);
    this.toggleEdit();
  }

  toggleEdit = () => {
    this.setState(state => ({ isEditOpen: !state.isEditOpen }));
  }

  submitDelete = () => {
    this.props.categoryStore.delete(this.props.category.id);
    this.toggleConfirm();
  }

  toggleConfirm = () => {
    this.setState(state => ({ isConfirmOpen: !state.isConfirmOpen }));
  }

  toggleCategory = () => {
    this.props.categoryStore.toggle(this.props.category.id);
  }

  move = () => {
    this.props.onMove(this.props.category.id);
  }
};
