const Web3 = require('web3');
var web3;


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
        console.log('vTH - caught error: ', error, '- errorType: ', typeof error);
        callback(null, createResponseObject(404, JSON.stringify(error))); 
       
     }
  }

  function validateError(errorString: string, code: string): boolean {
        if (errorString.indexOf(code) > -1) { // returns `-1` if it is not present.
            return true; // display this
        } else {
            return false;
        }
  }

  // This is the validateTransaction Lambda
  async function validateTransaction(txnHash) {
      // Validate inputs
      const nodeUrl = process.env.NLB_URL;
      console.log('NodeUrl: ', nodeUrl);
      console.log('txnHash : ', txnHash);
      if( !txnHash || txnHash.length != 66 ) {
        console.log('invalid txnHash - returning null : ', txnHash);
        return null;
      }

      // Establish Web3 connection
      web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));

      return validateTransactionPromise(txnHash).then((validity)=>{
        console.log('retrieved & will be returning validity - ', validity);
        return { validity };
      }).catch((errorCode) => {
          // Either (1) Timeout finding Hash || (2) Invalid transactionHash format
          console.log('pablo will handle this erorCode', errorCode);
          throw new Error(errorCode);
      });
  }

  async function validateTransactionPromise(txnHash) {
    console.log('VTP -txnHash: ', txnHash);
    var iterations = 0;
    var max_iterations = 5;
    return new Promise(async function(resolve, reject){
        var confirmationInterval = await setInterval( async function() {
          let txnReceipt;
            try{
                console.log('getting txnReceipt - ', txnReceipt);
                txnReceipt = await _getTransactionReceiptPromise(txnHash);
            } catch(err) {
                console.log("Error found in validateTransactionPromise", err);
                clearInterval(confirmationInterval);
                reject('ERROR_CODE_502');
                return
            }
            if(txnReceipt != null) {
                clearInterval(confirmationInterval);
                console.log('VTP - got the txnReceipt', txnReceipt);
                resolve(txnReceipt.status=='0x1');
                return
            } 
            else if(iterations == max_iterations) {
                console.log('VTP - max iterations; returning fail');
                clearInterval(confirmationInterval);
                reject('ERROR_CODE_404');
                return
            }
            iterations++;
        }, 3000)
    })
  }

  async function _getTransactionReceiptPromise(txnHash){
    console.log('_gTRP called');
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
