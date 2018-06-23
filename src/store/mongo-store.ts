import { connect } from 'mongoose';

import { IAction, Action, IActionModel } from '../action';
import Store from './store';

export default class MongoStore extends Store {
  database: string;
  hostname: string;
  password: string;
  username: string;

  constructor() {
    super();

    this.database = process.env.DB_DB || 'my-service';
    this.hostname = process.env.DB_HOSTNAME || 'localhost';
    this.password = process.env.DB_PASSWORD || 'pass';
    this.username = process.env.DB_USERNAME || 'admin';
  }

  async saveAction(action: IAction) {
    action.timestamp = new Date().getTime();
    
    try {
      await this.connect();
      await new Action(action).save();
    } catch(error) {
      console.log(error);
    }
  }

  async getActions(): Promise<IAction[]> {
    try {
      await this.connect();
      const actions = await Action.find({});
      return actions.map(action => action as IAction);
    } catch(error) {
      console.log(error);
    }
  }

  private async connect() {
    const { database, hostname, password, username } = this;
    const connectionString = `mongodb://${username}:${password}@${hostname}/${database}`;

    return connect(connectionString);
  }
}
