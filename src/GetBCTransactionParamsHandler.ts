const Web3 = require('web3');
var web3;

interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export async function getBCTransactionParamsHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    // process.chdir('/tmp');

    const params = JSON.parse(event.body);
    if(!params) {
      callback(null, createResponseObject(400, 'Invalid request'));
      return;
    }
    const {senderAddress, recipientAddress, record} = params;
    
    // VALIDATE ADDRESS IS NOT EMPTY
    if(!senderAddress || !recipientAddress || !record) {
        callback(null, createResponseObject(400, 'Invalid request'));
        return;
    }
    console.log('sender', senderAddress);
    console.log('recipientAddress', recipientAddress);
    console.log('record', record);
     // Establish Web3 connection
    const nodeUrl = process.env.NLB_URL;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
    console.log(web3.eth);
    // console.log('this is my block yo: ', web3.eth.blockNumber)
    console.log('this is my node yo: ', nodeUrl);
    console.log('contract', contractAddress);
    let contractABI = getContractABI();

    // Get reference to your contract
    const healthcareContract = web3.eth.contract(contractABI);
    const healthcareInstance = healthcareContract.at(contractAddress); //contractAddress is process.env variable

    // Get the required data for the client to sign client-side
    let data = healthcareInstance.storeRecordForUser.getData( recipientAddress, record );
    // ^^^ base64Encode( storeRecordForUser(a,b) ) -> string

    let count;
    try {
        count = await getTransactionCountPromise(senderAddress);
        console.log('count is: ', count);
    } catch (e) { 
        console.log("Unable to getTransactionCount for senderAddress: ", senderAddress, "; error: ", e);
        return;
    }
    let pendingCount;
    try {
        pendingCount = await getPendingTransactionCountPromise(senderAddress);
        console.log('pending count is: ', pendingCount);
    } catch (e) { 
        console.log("Unable to getTransactionPendingCount for senderAddress: ", senderAddress, "; error: ", e);
        return;
    }
    let txnParams = {
        nonce: count, gasPrice: '0x0', gasLimit: 800000,
        to: contractAddress, value: 0, data: data
    }

    callback(null, createResponseObject(200, JSON.stringify(txnParams)));
  }

  async function getTransactionCountPromise(from){ 
      return new Promise(function(resolve, reject) {
          web3.eth.getTransactionCount(from, function(err, res) {
              if(err) {console.log("Error found in getTransactionCountPromise is: ", err); reject(err) }
              else {resolve(res) };
          });
      });
  }

  async function getPendingTransactionCountPromise(from){ 
      return new Promise(function(resolve, reject) {
          web3.eth.getTransactionCount(from, 'pending', function(err, res) {
              if(err) {console.log("Error found in getTransactionCountPromise is: ", err); reject(err) }
              else {resolve(res) };
          });
      });
  }

  function getContractABI() {
    let ABI = [{"constant":false,"inputs":[{"name":"who","type":"address"},{"name":"record","type":"string"}],"name":"storeRecordForUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"getRecordsForUser","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
    return ABI
  }

  function createResponseObject(code: number, body: Object): IResponseObject {
      return {
          statusCode: code,
          body,
          headers: { 'Access-Control-Allow-Origin': '*' },
      };
  }
