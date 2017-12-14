import { observable, action, computed, runInAction, createTransformer } from 'mobx';
import { v4 } from 'uuid';
import todoStore from './TodoStore';


class CategoryStore {
  @observable categories = new Map();
  @observable pending = false;

  constructor() {
    this.fill();
    this.categories.assignee = todoStore;
  }

  @action
  fill() {
    return new Promise((resolve, reject) => {
      this.pending = true;
      fetch('/assets/categories.json')
        .then(resp => resp.json())
        .then(list => {
          runInAction(() => {
            list.forEach(item => {
              const { id, name, parent, isOpened, timestamp } = item;
              this.categories.set(id, new Category(id, name, parent, isOpened, timestamp));
            });
            // for (let i = 0; i < 1000; i++) {
            //   this.categories.set(i, new Category('Category '+i));
            // }
            this.pending = false;
            resolve();
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
          this.categories.set(id, new Category(id, name, parent));
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
        resolve();
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
          resolve();
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
          resolve();
        });
      }, 100);
    });
  }
  
  // @computed
  // get list() {
  //   return this.categories
  //     .keys()
  //     .sort((a, b) => this.categories.get(a).timestamp < this.categories.get(b).timestamp)
  //     .map(id => ({ id, ...this.categories.get(id) }));
  // }

  list = createTransformer(parent => {
    return this.categories
      .values()
      .filter(category => category.parent === parent)
      .sort((a, b) => a.timestamp < b.timestamp);
  });

  // hasChildren(id) {
  //   return !!this.categories.values().find(item => item.parent === id);
  // }
}


class Category {
	@observable name;
	@observable parent;
	@observable isOpened;

	constructor(id, name, parent = '', isOpened = false, timestamp = Date.now()) {
    this.id = id;
    this.name = name;
    this.parent =  parent;
    this.isOpened = isOpened;
    this.timestamp = timestamp;
  }
  
  @computed
  get hasChildren() {
    return !!categoryStore.categories.values().find(item => item.parent === this.id)
  }
}

const categoryStore = new CategoryStore();

export default categoryStore;
