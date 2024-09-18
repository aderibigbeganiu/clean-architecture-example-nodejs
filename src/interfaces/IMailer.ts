export interface IMailer {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}
