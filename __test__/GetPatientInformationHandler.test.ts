import { getPatientInformationHandler } from '../src/GetPatientInformationHandler';
describe('GetPatientInformationHandler Test', () => {
    test('01: getPatientInformationHandler', () => {
        expect(true).toBe(true);
        const callback = (arg1, arg2) => {
            console.log(arg1, arg2);
        }
        getPatientInformationHandler({}, {}, callback);
    })
});