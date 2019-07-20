import { Email } from "./models";

export interface EmailProcessor {
    sendEmail(email: Email);
}