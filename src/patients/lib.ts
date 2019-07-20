import { executeQuery, createDBConnection } from "../dbTools/mySql/dbTools";
import { getPatientById } from "./sql";
import { dbVariables } from "../dbTools/mySql/dbVariables";

export async function getPatients(id: string) {
    const conn = createDBConnection(dbVariables)
    const patient: any = await executeQuery(conn, getPatientById(id), []);
    console.log('** Patient: ', patient);
}