const Web3 = require('web3');

interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export async function validateTransactionHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
     const {txnHash} = JSON.parse(event.body);
     try {
        const result = await validateTransaction(txnHash);
        callback(null, createResponseObject(200, JSON.stringify(result)));
     } catch (error) {
        callback(null, createResponseObject(500, JSON.stringify(error)));
     }
  }

  // This is the validateTransaction Lambda
  async function validateTransaction(txnHash) {
      // Validate inputs
      const nodeUrl = process.env.NLB_URL;
      if( !txnHash || txnHash.length != 66 ) return null;

      // Establish Web3 connection
      const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));

      return validateTransactionPromise(txnHash, web3).then((validity)=>{
          return { validity };
      }).catch((errorCode) => {
          // Either (1) Timeout finding Hash || (2) Invalid transactionHash format
          console.log('pablo will handle this erorCode');
      });
  }

  async function validateTransactionPromise(txnHash, web3) {
    var iterations = 0;
    var max_iterations = 5;
    return new Promise(async function(resolve, reject){
        var confirmationInterval = await setInterval( async function() {
          let txnReceipt;
            try{
                txnReceipt = await _getTransactionReceiptPromise(txnHash, web3);
            } catch(err) {
                console.log("Error found in validateTransactionPromise", err);
                clearInterval(confirmationInterval);
                reject(502);
                return
            }
            if(txnReceipt != null) {
                clearInterval(confirmationInterval);
                resolve(txnReceipt.status=='0x1');
                return
            } 
            else if(iterations == max_iterations) { 
                clearInterval(confirmationInterval);
                reject(404);
                return
            }
            iterations++;
        }, 3000)
    })
  }

  async function _getTransactionReceiptPromise(txnHash, web3){
    return new Promise(function(resolve, reject) {
        web3.eth.getTransactionReceipt(txnHash, function(err, res) {
            if(err) reject(err);
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
