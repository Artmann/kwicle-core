import { Document, Schema, Model, model} from 'mongoose';
import IMessage from './message';

export interface IAction extends IMessage {
  name: string;
  payload: Object;
  timestamp: number;
};

export interface IActionModel extends IAction, Document {};

export const ActionSchema: Schema = new Schema({
  name: String,
  type: String,
  payload: Object,
  timestamp: Number
});

export const Action: Model<IActionModel> = model<IActionModel>('Action', ActionSchema);
