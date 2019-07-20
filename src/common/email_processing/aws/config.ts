import * as AWS from 'aws-sdk';
import { awsConfig } from '../../appVariables';

export const serviceConnection = new AWS.SES(awsConfig);