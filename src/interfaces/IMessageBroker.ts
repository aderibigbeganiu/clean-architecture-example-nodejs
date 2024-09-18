export interface IMessageBroker {
    publish(topic: string, payload: any): Promise<void>;
}