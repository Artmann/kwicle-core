import { IAction } from '../action';

import Store from './store';

export default class DummyStore extends Store {
  actions: Array<IAction>;

  constructor() {
    super();

    this.actions = [];
  }
  
  async saveAction(action: IAction) {
    this.actions.push(action);
  }
  
  async getActions() {
    return this.actions;
  }
}