interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export function helloWorldHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    const res = {
      hello: "Hello World"
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
