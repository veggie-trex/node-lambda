import { sqlTables } from "../dbTools/mySql/tables";
import { createElementSql } from "../dbTools/mySql/dbTools";

export function getPatientById(patientId: string) {
    const query = `SELECT * 
    FROM ${sqlTables.patients}
    WHERE id = ${patientId}`;
    return query;
}

export function createPatient(patient: { name: string }) {
    return createElementSql(sqlTables.patients, patient);
}