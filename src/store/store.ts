import { IAction } from "../action";

export default abstract class Store {
  abstract async saveAction(action: IAction): Promise<void>;
  abstract async getActions(): Promise<IAction[]>;
}