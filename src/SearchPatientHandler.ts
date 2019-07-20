interface IResponseObject {
    statusCode: number;
    body: Object;
    headers: Object;
}
const patients = [];

export function searchPatientHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    const patients = [{
        id: "123",
        name: "Juan Pablo Garcia",
        address: "2745 W. Logan Boulevard. #1st floor",
        city: "Chicago",
        state: "Illinois",
        email: "garjuanpablo@gmail.com",
        blockChainAccount: "1032369367"
    }];
    const body = JSON.parse(event.body);
    const filteredPatients = patients.filter((item) => item.id === body.id)
    callback(null, createResponseObject(200, JSON.stringify(filteredPatients)));
}

function createResponseObject(code: number, body: Object): IResponseObject {
    return {
        statusCode: code,
        body,
        headers: { 'Access-Control-Allow-Origin': '*' },
    };
}