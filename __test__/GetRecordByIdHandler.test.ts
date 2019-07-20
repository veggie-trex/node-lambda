import { getPatientRecordByIdHandler } from '../src/GetPatientRecordByIdHandler';
describe('Test GetRecordByIdHandler', () => {
    test('01: getRecordByIdHandler', () => {
        const event = {
            pathParameters: {
                patientId: '123',
                recordId: '456'
            }
        }
        getPatientRecordByIdHandler(event, {}, (arg1, arg2) => {
            console.log('arg1', arg1);
            console.log('arg2', arg2);
        });
    });
})