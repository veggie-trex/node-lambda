import { testBCHandler } from "../src/TestBCHandler";

describe('', () => {
    test('testBC', () => {
    	const event = {
            body: JSON.stringify({
                "address": "0xA36c0e3C4875D9A4640F624c051a5E077B697E0f"
            })
        }

        const callBack = (status, results) => {
            console.log(results.body);
        };

        testBCHandler(event, {}, callBack);

    })
});