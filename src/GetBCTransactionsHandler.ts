const Web3 = require('web3');

interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export async function getBCTransactionsHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    process.chdir('/tmp');

    // 1. Get Required Input Params & Validate
    const params = JSON.parse(event.body);
    if(!params) {
      callback(null, createResponseObject(400, 'Invalid request'));
      return;
    }
    const {address} = params;
    
    // VALIDATE ADDRESS IS NOT EMPTY
    if(!address) {
        callback(null, createResponseObject(400, 'Invalid request'));
        return;
    }

    // 2. Get Environment Variables / Constants
    const nodeUrl = process.env.NLB_URL;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const contractABI = getContractABI();
    
    // 3. Get Access to Smart Contract
    const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
    const healthcareContract = web3.eth.contract(contractABI);
    const healthcareInstance = healthcareContract.at(contractAddress);
    
    let records;
    try {
      records = healthcareInstance.getRecordsForUser(address)
    } catch(e) {
      console.log(e);
    }
    const splitRecords = records && records.split(';');
    callback(null, createResponseObject(200, JSON.stringify(splitRecords)));
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
