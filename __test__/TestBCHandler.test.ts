import { testBCHandler } from '../src/TestBCHandler';
describe('TestBCHandler Test', () => {
    test('01: testBCHandler', (done) => {
        const callback = (arg1, arg2) => {
            console.log(arg2);
            console.log(arg1);
            done();
        }
        testBCHandler({}, {}, callback);
    })
});