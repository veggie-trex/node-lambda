const axios = require('axios');
const Web3 = require('web3');

interface IResponseObject {
      statusCode: number;
      body: Object;
      headers: Object;
  }

  export async function testBCHandler(event: any, _context: any, callback: (err: any, res: any) => any) {
    process.chdir('/tmp');

    // 1. Get Required Input Params & Validate
    console.log('enter');
    const params = JSON.parse(event.body);
    if(!params) {
      callback(null, createResponseObject(400, 'Invalid request'));
      return;
    }
    const {address} = params;
    console.log(params);
    // VALIDATE ADDRESS IS NOT EMPTY
    if(!address) {
        callback(null, createResponseObject(400, 'Invalid request'));
        return;
    }
    console.log('valid');
    // 2. Get Environment Variables / Constants
    const nodeUrl = process.env.NLB_URL;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const contractABI = getContractABI();
    console.log(contractABI);
    // 3. Get Access to Smart Contract
    const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
    const healthcareContract = web3.eth.contract(contractABI);
    const healthcareInstance = healthcareContract.at(contractAddress);
    console.log('have an instance');
    const records = healthcareInstance.getRecordsForUser(address).split(';');
    console.log(records);
    callback(null, createResponseObject(200, JSON.stringify(records)));
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
