import { patientGetInformationHandler } from '../src/PatientGetInformationHandler';
describe('PatientGetInformationHandler Test', () => {
    test('01: patientGetInformationHandler', () => {
        expect(true).toBe(true);
        const callback = (arg1, arg2) => {
            console.log(arg1, arg2);
        }
        patientGetInformationHandler({}, {}, callback);
    })
});