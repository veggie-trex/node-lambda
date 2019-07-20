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
      console.log(response)
    } catch(e) {
      console.log(e);
    }
    // const res = axios.get('https://google.com')
    //   .then(function(response) {
    //     results = response.data;
    //     return response.data;
    //   }) 
    //   .catch(function(err) {
    //     return err
    //   })
    // result.then(function(res) {
    //   return res;
    // });
    // const res = {}
    callback(null, createResponseObject(200, response.data));
  }

  function createResponseObject(code: number, body: Object): IResponseObject {
      return {
          statusCode: code,
          body,
          headers: { 'Access-Control-Allow-Origin': '*' },
      };
  }
