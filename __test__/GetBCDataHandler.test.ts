import { getBCDataHandler } from "../src/GetBCDataHandler";

describe('', () => {
    test('getBCData', (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000000;
        const callBack = (arg1, arg2) => {
            console.log('arg2', arg2);
            done();
        };
        const event = {
            body: JSON.stringify({
                senderAddress: "0xA36c0e3C4875D9A4640F624c051a5E077B697E0f",
                recipientAddress: "0xA36c0e3C4875D9A4640F624c051a5E077B697E0f",
                record: "VGVzdGluZyBUZXN0aW5nIEJPT00gQk9PTSBCT09N"
            })
        }
        getBCDataHandler(event, {}, callBack);
    })
});