import { validateTransactionHandler } from "../src/ValidateTransactionHandler";

describe('', () => {
    test('validateTransaction', (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000000;
        const callBack = (arg1, arg2) => {
            console.log('arg2', arg2);
            done();
        };
        const event = {
            body: JSON.stringify({
                "txnHash": "0x073d83b5a505f7a05704e2d087435c57afb260a6000109a239b80dc4b03f3c66"
            })
        }
        validateTransactionHandler(event, {}, callBack);
    })
});