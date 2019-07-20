import { createRecordHandler } from "../src/CreateRecordHandler";

describe('', () => {
    test('', () => {
        const callBack = (arg1, arg2) => {
            console.log('arg2', arg2);
        };
        const event = {
            body: {
                name: "Hello Name"
            }
        }
        createRecordHandler(event, {}, callBack);
    })
});