import patients from "../src/mockData/patients.json";

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
