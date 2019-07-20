import { searchPatientHandler } from "../src/SearchPatientHandler";

describe('', () => {
    test('', () => {
        const callBack = (status, results) => {
            console.log(results.body.patient);
        };

        const patientOne = {
            body: {
                "patient_key": "87ABAB1D-4262-431B-B569A0FCB4776426"
            }
        };

        searchPatientHandler(patientOne, {}, callBack);

    })
});