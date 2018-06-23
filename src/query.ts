import IMessage from './message';

export default interface IQuery extends IMessage {
    name: string;
    args: Array<any>;
}