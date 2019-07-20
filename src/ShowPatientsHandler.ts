import patients from "../src/mockData/patients.json";

interface IResponseObject {
    statusCode: number;
    body: Object;
    headers: Object;
}

export function showPatientsHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
  const res = patients;
  callback(null, createResponseObject(200, JSON.stringify(res)));
}

function createResponseObject(code: number, body: Object): IResponseObject {
    return {
        statusCode: code,
        body,
        headers: { 'Access-Control-Allow-Origin': '*' },
    };
}
