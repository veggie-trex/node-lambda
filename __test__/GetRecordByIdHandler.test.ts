import { getRecordByIdHandler } from '../src/GetRecordByIdHandler';
describe('Test GetRecordByIdHandler', () => {
    test('01: getRecordByIdHandler', () => {
        const event = {
            pathParameters: {
                patientId: '123',
                recordId: '456'
            }
        }
        getRecordByIdHandler(event, {}, (arg1, arg2) => {
            console.log('arg1', arg1);
            console.log('arg2', arg2);
        });
    });
})