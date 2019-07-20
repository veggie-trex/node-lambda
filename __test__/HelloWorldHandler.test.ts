import { helloWorldHandler } from '../src/HelloWorldHandler';
describe('HelloWorldHandler Test', () => {
    test('01: hellWorldHandler', () => {
        expect(true).toBe(true);
        const callback = (arg1, arg2) => {
            console.log(arg1, arg2);
        }
        helloWorldHandler({}, {}, callback);
    })
});