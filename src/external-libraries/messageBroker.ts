import { IMessageBroker } from "../interfaces/IMessageBroker";

export class MessageBroker implements IMessageBroker {
    async publish(topic: string, payload: string) {
        // Implementation of sending email using a mailer library
        console.log(`Broker sent to ${topic}: Payload: ${payload}`);
        return;
    }
}
