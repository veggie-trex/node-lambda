interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export function patientGetInformationHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    const res = {
      "id": "EFA7F01F-517F-433B-9FC00FC447E65F37",
      "patient": {
        "id": "87ABAB1D-4262-431B-B569A0FCB4776426",
        "name": "Testing Patient",
        "dob": "04/11/1992",
        "ssn": "4321",
        "address": "123 Patient St.",
        "phone": "773-555-5555"
      }
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
