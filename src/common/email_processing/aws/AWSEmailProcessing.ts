import { EmailProcessor } from '../EmailProcessor';
import { Email } from '../models';
import { serviceConnection } from './config';

export class AWSEmailProcessing implements EmailProcessor {
    sendEmail(email: Email): Promise<boolean> {
        const params = {
            Destination: {
                ToAddresses: [
                    email.to,
                ]
            },
            Message: {
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: email.textBody
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: email.subject
                }
            },
            Source: email.from
        }; 
        return serviceConnection.sendEmail(params).promise()
        .then(result => {
            return Promise.resolve(true);
        })
        .catch(err => {
            return Promise.reject(err);
        });
    }
}