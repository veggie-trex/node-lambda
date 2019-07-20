interface IResponseObject {
    statusCode: number;
    body: Object;
    headers: Object;
}
const patients = [];

export function searchPatientHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    const patients = [{
        "id": "87ABAB1D-4262-431B-B569A0FCB4776426",
        "name": "Testing Patient",
        "dob": "04/11/1992",
        "ssn": "4321",
        "address": "123 Patient St.",
        "phone": "773-555-5555"
    }, 
    {
        "id": "BA0607BD-4F37-474B-B9B6BB9FBFF3AD3D",
        "name": "Testing Patient 1",
        "dob": "06/22/1975",
        "ssn": "2255",
        "address": "4563 North Fake St.",
        "phone": "817-555-5555"
    }];
    const body = JSON.parse(event.body);
    const filteredPatients = patients.filter((item) => item.id === body.patient_key);
    callback(null, createResponseObject(200, JSON.stringify(filteredPatients)));
}

function createResponseObject(code: number, body: Object): IResponseObject {
    return {
        statusCode: code,
        body,
        headers: { 'Access-Control-Allow-Origin': '*' },
    };
}