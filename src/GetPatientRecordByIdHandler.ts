interface IResponseObject {
  statusCode: number;
  body: Object;
  headers: Object;
}

export function getPatientRecordByIdHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
const patientId = event.pathParameters.patientId;
const recordId = event.pathParameters.recordId;

const res = {
	doctorId: recordId,
	patientId: patientId,
	immunizationType: "IM-MS-0001",
	immunizationDate: 1563636169,
	nextImmunizationDate: 1593820800
}
callback(null, createResponseObject(200, JSON.stringify(res)));
}

function createResponseObject(code: number, body: Object): IResponseObject {
  return {
      statusCode: code,
      body,
      headers: { 'Access-Control-Allow-Origin': '*' },
  };
}
