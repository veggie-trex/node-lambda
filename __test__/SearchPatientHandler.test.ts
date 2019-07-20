import { searchPatientHandler } from "../src/SearchPatientHandler";

describe('', () => {
    test('', () => {
        const callBack = (status, results) => {
            console.log(results);
        };

        const patientOne = {
            body: JSON.stringify({id: "123"})
        };
    
        searchPatientHandler(patientOne, {}, callBack);

    })
});