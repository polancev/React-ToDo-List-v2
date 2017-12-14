import { observable, action, computed, runInAction, createTransformer } from 'mobx';
import { v4 } from 'uuid';


class TodoStore {
  @observable todos = new Map();
  @observable pending = false;

  constructor() {
    this.fill();
  }

  fill(category) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      fetch('/assets/todos.json')
        .then(resp => resp.json())
        .then(list => {
          runInAction(() => {
            list.forEach(item => {
              this.todos.set(item.id, new Todo(
                item.id,
                item.task,
                item.category,
                item.completed
              ));
            });
            this.pending = false;
            resolve();
          });
        });
    });
  }

  // @computed
  // get list() {
  //   return this.todos
  //     .keys()
  //     .sort((a, b) => this.todos.get(a).timestamp < this.todos.get(b).timestamp)
  //     .map(id => ({ id, ...this.todos.get(id) }));
  // }

  list = createTransformer(({ selectedCategory, checked, filter }) => {
    return this.todos
      .values()
      .filter(todo => {
        if (todo.category === selectedCategory) {
          if (!checked && todo.completed) {
            return false;
          }
          if (filter && todo.task.toUpperCase().indexOf(filter.toUpperCase()) === -1) {
            return false;
          }
          return true;
        }
        return false;
      })
      .sort((a, b) => a.timestamp < b.timestamp);
  });

  @action
  add(task, category) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      setTimeout(() => {
        runInAction(() => {
          const id = v4();
          this.todos.set(id, new Todo(id, task, category));
          this.pending = false;
          resolve();
        });
      }, 100);
    });
  }

  @action
  update(id, state) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      setTimeout(() => {
        runInAction(() => {
          const todo = this.todos.get(id);
          this.todos.set(id, { ...todo, ...state });
          this.pending = false;
          resolve();
        });
      }, 100);
    });
  }

  @action
  check(id) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      setTimeout(() => {
        runInAction(() => {
          const todo = this.todos.get(id);
          todo.completed = !todo.completed;
          this.pending = false;
          resolve();
        });
      }, 100);
    });
  }

  @action
  move(id, category) {
    return new Promise((resolve, reject) => {
      this.pending = true;
      setTimeout(() => {
        runInAction(() => {
          this.todos.get(id).category = category;
          this.pending = false;
          resolve();
        });
      }, 100);
    });
  }

  @action
  deleteByCategory(category) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        runInAction(() => {
          this.todos.keys()
            .filter(id => this.todos.get(id).category === category)
            .forEach(id => this.todos.delete(id));
          resolve();
        });
      });
    });
  }

  getTodoById(id) {
    return this.todos.get(id);
  }

  @computed
  get progress() {
    const categories = new Set();
    const undone = new Set();
    this.todos.values().forEach(todo => {
      const { category, completed } = todo;
      if (!categories.has(category)) 
        categories.add(category);
      if (!completed && !undone.has(categories)) 
        undone.add(category);
    });
    return categories.size === 0 ? 100 : (1 - undone.size / categories.size) * 100 ;
  }

  categoryDone(category) {
    return this.todos.values().filter(todo => todo.category === category && todo.done === true).length;
  }
}

export default new TodoStore();

class Todo {
  id;
  @observable task = '';
  @observable category = null;
  @observable completed = false;
  description = '';

  constructor(id, task, category, completed = false, timestamp = Date.now()) {
    this.id = id;
    this.task = task;
    this.category = category;
    this.completed = completed;
    this.timestamp = timestamp;
  }
}