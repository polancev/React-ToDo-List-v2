import { observable, action, computed, runInAction } from 'mobx';
import { v4 } from 'uuid';
import todoStore from './TodoStore';


class CategoryStore {
  @observable categories = new Map();
  @observable pending = false;

  constructor() {
    this.fill();
    this.categories.assignee = todoStore;
  }

  fill() {
    return new Promise((resolve, reject) => {
      this.pending = true;
      fetch('/assets/categories.json')
        .then(resp => resp.json())
        .then(list => {
          runInAction(() => {
            list.forEach(item => {
              this.categories.set(item.id, {...item});
            });
            for (let i = 0; i < 1000; i++) {
              this.categories.set(i, new Category('Category '+i));
            }
            this.pending = false;
          });
        });
    });
  }

  @action
  add(name, parent) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      setTimeout(() => {
        runInAction(() => {
          const id = v4();
          this.categories.set(id, new Category(name, parent));
          if (parent) {
            this.toggle(parent, true);
          }
          this.pending = false;
          resolve(id);
        });
      }, 100);
    });
  }
  
  @action
  delete(id) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      setTimeout(() => {
        if (this.categories.has(id)) {
          this.categories.delete(id);
          todoStore.deleteByCategory(id);
          this.categories.keys()
            .filter(childId => this.categories.get(childId).parent === id)
            .forEach(childId => this.delete(childId));
        }
        this.pending = false;
      }, 100);
    });
  }

  @action
  update(id, key, value) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      setTimeout(() => {
        runInAction(() => {
          this.categories.get(id)[key] = value;
          this.pending = false;
        });
      }, 100);
    });
  }

  @action
  toggle(id, toggle) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      setTimeout(() => {
        runInAction(() => {
          if (toggle !== undefined) {
            this.categories.get(id).isOpened = toggle;
          } else {
            this.categories.get(id).isOpened = !this.categories.get(id).isOpened;
          }
          this.pending = false;
        });
      }, 100);
    });
  }
  
  @computed
  get list() {
    return this.categories
      .keys()
      .sort((a, b) => this.categories.get(a).timestamp < this.categories.get(b).timestamp)
      .map(id => ({ id, ...this.categories.get(id) }));
  }

  hasChildren(id) {
    return !!this.categories.values().find(item => item.parent === id);
  }
}


class Category {
	@observable name = '';
	@observable parent = null;
	@observable isOpened = false;

	constructor(name, parent) {
    this.name = name;
    this.parent =  parent || null;
    this.timestamp = Date.now();
  }
  
  @computed
  get hasChildren() {
    return !!categoryStore.categories.value().find(item => item.parent === this.id)
  }
}

const categoryStore = new CategoryStore();

export default categoryStore;
