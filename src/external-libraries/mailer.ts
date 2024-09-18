import { IMailer } from "../interfaces/IMailer";

export class Mailer implements IMailer {
    async sendEmail(to: string, subject: string, body: string) {
        // Implementation of sending email using a mailer library
        console.log(`Email sent to ${to}: Subject: ${subject}, Body: ${body}`);
        return;
    }
}
