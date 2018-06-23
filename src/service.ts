import { connect, Channel, Connection } from 'amqplib';
import { config } from 'dotenv';

import { IAction, IActionModel } from './action';
import MongoStore from './store/mongo-store';
import IMessage from './message';
import IQuery from './query';
import IState from './state';
import Store from './store/store';

export default class Service {
  store: Store;

  constructor(private reducers: any, private queries: any, store: Store) {
    config();

    this.store = store || new MongoStore();
  }

  start() {
    connect("amqp://localhost").then((connection: Connection) => {
      connection.createChannel().then((channel: Channel) => {
        const queueName = "kwicle";

        channel.assertQueue(queueName, { durable: true });
        channel.prefetch(1);

        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queueName
        );

        channel.consume(
          queueName,
          msg => {
            const respond = (response: Object) => {
              const data = JSON.stringify(response);
              channel.sendToQueue(msg.properties.replyTo, Buffer.from(data), {
                correlationId: msg.properties.correlationId
              });
              channel.ack(msg);
            };

            console.log(" [x] Received %s", msg.content.toString());

            const message = JSON.parse(msg.content.toString()) as IMessage;

            if (message.type.toLowerCase() === "action") {
              const action = message as IAction;
              if (this.hasReducer(action.name)) {
                console.log(`Reducer: ${action.name}`);
                this.store.saveAction(action).then(() => {
                  respond({ statusCode: 200 });
                });
              }
            }

            if (message.type.toLowerCase() === "query") {
              const query = message as IQuery;
              console.log(`Query: ${query.name}`);

              if (this.hasQuery(query.name)) {
                this.getState().then((state: IState) => {
                  const response: any = { statusCode: 200 };
                  response[query.name] = this.queries[query.name](
                    state,
                    ...query.args
                  );
                  console.log(response);
                  respond(response);
                });
              }
            }
          },
          { noAck: false }
        );
      });
    });
  }

  private async getState(): Promise<IState> {
    const actions = await this.store.getActions();

    const state: IState = actions
      .sort((a: IActionModel, b: IActionModel) => {
        return a.timestamp >= b.timestamp ? 1 : -1;
      })
      .reduce(
        (previousState: IState, action: IActionModel) => {
          if (!this.hasReducer(action.name)) {
            return previousState;
          }
          
          const reducer = this.reducers[action.name];
          return reducer(previousState, action.payload);
        },
        {} as IState
      );
    
    return state;
  }

  private hasReducer(reducerName: string): boolean {
    return this.reducers.hasOwnProperty(reducerName);
  }

  private hasQuery(queryName: string): boolean {
    return this.queries.hasOwnProperty(queryName);
  }
}
