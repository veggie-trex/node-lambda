import { showPatientsHandler } from "../src/ShowPatientsHandler";

describe('', () => {
    test('', () => {
        const callBack = (status, results) => {
            console.log(results.body);
        };

        showPatientsHandler({}, {}, callBack);

    })
});