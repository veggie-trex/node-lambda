const Web3 = require('web3');

interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export async function sendBCTransactionHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
     const {signedTransaction} = JSON.parse(event.body);
     try {
        const result = await sendTransaction(signedTransaction);
        callback(null, createResponseObject(200, JSON.stringify(result)));
     } catch (error) {
        callback(null, createResponseObject(500, JSON.stringify(error)));
     }
  }

  async function sendTransaction(signedTransaction) {
    const nodeUrl = process.env.NLB_URL;
    // Establish Web3 connection
    const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));

    // Submit the signed Transaction
    let txnHash;
    try{
        txnHash = await sendRawTransactionPromise(signedTransaction, web3);
    } catch(e) {
         throw(e);
    }
    if (txnHash) {
        return { "transactionHash": txnHash };
    }
  }

  async function sendRawTransactionPromise(serializedTx, web3) {
    return new Promise(function(resolve, reject) {
        web3.eth.sendRawTransaction(serializedTx, function(err, res) {
            if(err) reject(err)
            else resolve(res);
        });
    });
  }

  function createResponseObject(code: number, body: Object): IResponseObject {
      return {
          statusCode: code,
          body,
          headers: { 'Access-Control-Allow-Origin': '*' },
      };
  }
