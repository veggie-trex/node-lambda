const patients = [{
    "patient": {
        "id": "87ABAB1D-4262-431B-B569A0FCB4776426",
        "name": "Testing Patient",
        "dob": "04/11/1992",
        "ssn": "4321",
        "address": "123 Patient St.",
        "phone": "773-555-5555"
    }
}, 
{
    "patient": {
        "id": "BA0607BD-4F37-474B-B9B6BB9FBFF3AD3D",
        "name": "Testing Patient 1",
        "dob": "06/22/1975",
        "ssn": "2255",
        "address": "4563 North Fake St.",
        "phone": "817-555-5555"
    }
}];

interface IResponseObject {
    statusCode: number;
    body: Object;
    headers: Object;
}

export function searchPatientHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
  const res = patients.filter((patientRecord) => patientRecord.patient.id == event.body.patient_key);
  if(res.length > 0) {
      callback(null, createResponseObject(200, res[0]));
  }
  callback(null, createResponseObject(404, {"message": "error finding patient"}));
}

function createResponseObject(code: number, body: Object): IResponseObject {
    return {
        statusCode: code,
        body,
        headers: { 'Access-Control-Allow-Origin': '*' },
    };
}
