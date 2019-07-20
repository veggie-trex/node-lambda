interface IResponseObject {
    statusCode: number;
    body: Object;
    headers: Object;
}

export function createRecordHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
  console.log('Record: ', JSON.stringify(event.body));
  const res = event.body;
  callback(null, createResponseObject(200, JSON.stringify(res)));
}

function createResponseObject(code: number, body: Object): IResponseObject {
    return {
        statusCode: code,
        body,
        headers: { 'Access-Control-Allow-Origin': '*' },
    };
}
