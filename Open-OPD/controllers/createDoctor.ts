import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { CREATE_DOCTOR } from '../queries/queries';

export default async function createDoctor(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  console.log(args);
  const phoneNumber = args[0].phoneNumber as string;
  const firstName = args[0].firstName as string;
  const lastName = args[0].lastName as string;
  const age = args[0].age as string;
  const gender = args[0].gender as string;
  const nid = args[0].nid as string;
  const passcode = args[0].passcode as string;
  const joiningDate = args[0].joiningDate as string;
  const userType = args[0].userType as string;
  const speciality = args[0].speciality as string;
  const consultationFee = args[0].consultationFee as number;

  const request = new mssql.Request(pool);
  request
    .query(
      CREATE_DOCTOR(
        phoneNumber,
        firstName,
        lastName,
        age,
        gender,
        passcode,
        nid,
        speciality,
        consultationFee
      )
    )
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Failed to create doctor']);
        return '';
      }
      event.sender.send(Channels.CREATE_RECEPTIONIST_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to create doctor']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
