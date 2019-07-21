const axios = require('axios');
const Web3 = require('web3');

interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export async function testBCHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    process.chdir('/tmp');
    
    const nlbURL = process.env.NLB_URL;
    console.log('HIT')
    console.log(nlbURL);
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(nlbURL));
      console.log(web3.eth.blockNumber);
      console.log(web3.net.peerCount);
    } catch(e) {
      console.log(e);
    }

    callback(null, createResponseObject(200, 'Done'));
    // let response = null;
    // try {
    //   response = await axios.post('http://HH-Nodes-NLB-81c64a05c47dd62f.elb.us-east-2.amazonaws.com:8545', 
    //     {
    //       "jsonrpc":"2.0",
    //       "method":"net_peerCount",
    //       "id":64
    //  });
    // } catch(e) {
    //   callback(null, createResponseObject(200, e));
    // }
  }

  function createResponseObject(code: number, body: Object): IResponseObject {
      return {
          statusCode: code,
          body,
          headers: { 'Access-Control-Allow-Origin': '*' },
      };
  }
