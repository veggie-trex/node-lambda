const axios = require('axios');

interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export async function testBCHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    let response = null;
    try {
      response = await axios.get('http://HH-Nodes-NLB-81c64a05c47dd62f.elb.us-east-2.amazonaws.com');
      callback(null, createResponseObject(200, response.data));
    } catch(e) {
      callback(null, createResponseObject(200, e));
    }
  }

  function createResponseObject(code: number, body: Object): IResponseObject {
      return {
          statusCode: code,
          body,
          headers: { 'Access-Control-Allow-Origin': '*' },
      };
  }
