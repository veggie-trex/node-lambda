interface IResponseObject {
    statusCode: number;
    body: Object;
    headers: Object;
}

export function getPatientHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
  const res = {
    id: "123",
    name: "Juan Pablo Garcia",
    address: "2745 W. Logan Boulevard. #1st floor",
    city: "Chicago",
    state: "Illinois",
    email: "garjuanpablo@gmail.com",
    blockChainAccount:"1032369367"
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
