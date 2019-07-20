import * as mysql from 'mysql';

import { MISSING_STAGE_VARS,
        MISSING_DB_HOST,
        MISSING_DB_USER,
        MISSING_DB_PASSWORD,
        MISSING_DB_NAME } from './../constants';

export function checkDBConnectionInfo(stageVariables: any) {
  if (stageVariables === undefined || stageVariables === null) {
    throw ({ code: 500, message: MISSING_STAGE_VARS });
  }
  if (stageVariables.DB_HOST === undefined || stageVariables.DB_HOST === null) {
    throw ({ code: 500, message: MISSING_DB_HOST });
  }
  if (stageVariables.DB_USER === undefined || stageVariables.DB_USER === null) {
    throw ({ code: 500, message: MISSING_DB_USER });
  }
  if (stageVariables.DB_PASSWORD === undefined || stageVariables.DB_PASSWORD === null) {
    throw ({ code: 500, message: MISSING_DB_PASSWORD });
  }
  if (stageVariables.DB_NAME === undefined || stageVariables.DB_NAME === null) {
    throw ({ code: 500, message: MISSING_DB_NAME });
  }
}

export function createDBConnection (connectionCreds: any) {
  const host = connectionCreds.DB_HOST;
  const user = connectionCreds.DB_USER;
  const password = connectionCreds.DB_PASSWORD;
  const database = connectionCreds.DB_NAME;

  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });
  connection.connect();

  return connection;
}

export function executeQuery (connection: any, query: string, params: string[]) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, result) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result);
      }
    });
  });
}

export function createElementSql(table: string, element: any) {
  let insert = `INSERT INTO ${table}`;
  let attributeList = '';
  let valueList = '';
  for (let prop in element) {
    if (element[prop] !== undefined) {
      attributeList += `${prop},`;
      valueList += `'${element[prop]}',`;
    }
  }
  // Remove Last Commas
  attributeList = attributeList.slice(0, -1);
  valueList = valueList.slice(0, -1);
  const query = `${insert} (${attributeList}) VALUES (${valueList})`;
  return query;
}

export function executeBatchQueries(connection: any, getPromiseArray: any) {
  return new Promise((resolve, reject) => {
    connection.beginTransaction((error) => {
      if (error) {
        reject ({ code: 500, message: error });
      }
      const deletePromiseArray = getPromiseArray(connection);

      Promise.all(deletePromiseArray)
      .then((results) => {
        connection.commit((error) => {
          if (error) {
            connection.rollback(() => {
              reject(error);
            });
          }
          resolve(results);
        });
      })
      .catch((error) => {
        connection.rollback(() => {
          reject(error)
        });
      });
    });
  })
}

export function disconnectDB (connection) {
  connection.destroy();
}
