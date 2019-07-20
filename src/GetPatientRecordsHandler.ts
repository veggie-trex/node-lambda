interface IResponseObject {
  statusCode: number;
  body: Object;
  headers: Object;
}

export function getPatientRecordsHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
const res = [{
	doctorId: "doctorId-123",
	patientId: "patientId-123",
	immunizationType: "IM-MS-0001",
	immunizationDate: 1563636169,
	nextImmunizationDate: 1593820800
}]
callback(null, createResponseObject(200, JSON.stringify(res)));
}

function createResponseObject(code: number, body: Object): IResponseObject {
  return {
      statusCode: code,
      body,
      headers: { 'Access-Control-Allow-Origin': '*' },
  };
}
