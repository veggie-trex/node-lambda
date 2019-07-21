import { testBCHandler } from "../src/TestBCHandler";

describe('', () => {
    test('testBC', () => {
    	const event = {
            body: JSON.stringify({
                "address": "0x36de2bee3ee97fd8f2717cd8d1ebab1f317dc417"
            })
        }

        const callBack = (status, results) => {
            console.log(results.body);
        };

        testBCHandler(event, {}, callBack);

    })
});